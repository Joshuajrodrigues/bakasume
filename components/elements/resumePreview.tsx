"use client"
import { BlobProvider } from '@react-pdf/renderer';
import { useRef, useState } from 'react';
import { PiDownloadBold } from "react-icons/pi";
import { Page as DocumentPage, Document as DocumentViewer, pdfjs } from 'react-pdf';
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Resume } from '../resumeTemplates/default';
import { Button } from '../ui/button';
import Spin from './loading';
// https://github.com/diegomura/react-pdf/issues/714
//https://github.com/wojtekmaj/react-pdf/wiki/Recipes
//https://github.com/diegomura/react-pdf/issues/1113
//work shit => https://stackoverflow.com/questions/75253619/react-pdf-viewer-library-cannot-render-the-first-page-as-soon-as-the-minimum-req
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();


const ResumePreview = () => {
    const [numPages, setNumPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [isPageReady, setIsPageReady] = useState(false)
    const parentRef = useRef<HTMLDivElement>(null);

    function changePage(offset: number) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <div ref={parentRef} className='flex flex-col justify-center items-center'>
            <BlobProvider document={Resume}>
                {({ blob, url, loading, error }) =>
                    loading ? (
                        <Spin />
                    ) : (
                        <>
                            <DocumentViewer
                                onLoadSuccess={onDocumentLoadSuccess}
                                file={url}
                                loading={loading ? <Spin />
                                    : null}
                            >
                                <DocumentPage
                                    loading={loading ? <Spin /> : null}
                                    pageNumber={pageNumber}
                                    onRenderSuccess={() => setIsPageReady(true)}
                                    error={"Error"}
                                    width={parentRef.current?.clientWidth}
                                />
                            </DocumentViewer>
                            {
                                isPageReady &&
                                <div className='flex space-x-2'>
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        size={"sm"}
                                        className=' w-24'
                                        disabled={pageNumber <= 1}
                                        onClick={previousPage}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        size={"sm"}
                                        className=' w-24'
                                        disabled={pageNumber >= numPages}
                                        onClick={nextPage}
                                    >
                                        Next
                                    </Button>
                                </div>
                            }
                        </>
                    )
                }
            </BlobProvider>
            {/* <embed type="application/pdf" title='resume' src={instance.url || ""}  /> */}
            <Button className='w-64 m-4'><PiDownloadBold className='mr-2' />Download</Button>
        </div>
    )
}

export default ResumePreview

