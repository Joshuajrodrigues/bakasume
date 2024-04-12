import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditForm from "./editForm";


export function AppSwitch() {
    return <div className="mt-2">
        <Tabs defaultValue="edit" className="w-[400px] flex flex-col items-center justify-center">
            <TabsList>
                <TabsTrigger className="w-24" value="edit">Edit</TabsTrigger>
                <TabsTrigger className="w-24" value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit">Make changes to your resume here.
                <EditForm />
            </TabsContent>
            <TabsContent value="preview">This is what it'll look like.</TabsContent>
        </Tabs>
    </div>;
}