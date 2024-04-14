
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditForm from "./editForm";
import ResumePreview from "./resumePreview";


export function AppSwitch() {
    return <div className="mt-2">
        <Tabs defaultValue="edit" className=" flex flex-col items-center justify-center">
            <TabsList>
                <TabsTrigger className="w-24" value="edit">Edit</TabsTrigger>
                <TabsTrigger className="w-24" value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
                <span>Make changes to your resume here.</span>
                <EditForm />
            </TabsContent>
            <TabsContent value="preview">
                <span className="mx-10">This is what it'll look like.</span>
                <ResumePreview />
            </TabsContent>
        </Tabs>
    </div>;
}