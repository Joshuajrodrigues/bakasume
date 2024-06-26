"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { PiTrashBold } from "react-icons/pi"
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const userContactInfo = z.object({
    value: z.string(),
});

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    contact: z.array(userContactInfo).min(1, {
        message: "Add some info on how to contact you",
    }),
});

const EditForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            contact: [{ value: "" }]
        },
    });

    const {
        fields: contactFields,
        append: addContactFields,
        remove: removeContactFields,
    } = useFieldArray({
        name: "contact",
        control: form.control,
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <div className="mt-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mark Zuckerbub" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Your name to be displayed on the resume.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        contactFields.map((field, index) => (

                            <FormField

                                key={field.id}
                                control={form.control}
                                name={`contact.${index}.value`}
                                render={({ field }) => (
                                    <FormItem className={cn(index !== 0 && "-space-y-4")}>
                                        <FormLabel className={cn(index !== 0 && "hidden")}>Contact Info</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />

                                        </FormControl>
                                        <span className="w-full flex justify-end items-center" >

                                            <Button variant={"link"} type="button" className={cn(index === 0 ? " hidden" : "text-red-500 px-0 py-8")} onClick={() => removeContactFields(index)}><PiTrashBold />Delete</Button>
                                        </span>


                                        <FormDescription className={cn(index !== 0 && "hidden")}>
                                            Add contact information like phone, email etc.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))
                    }<Button type="button" variant={"outline"} size={"sm"} onClick={() => addContactFields({ value: "" })}>Add more</Button>



                    <Button className="block" type="submit">Save & Preview</Button>
                </form>
            </Form>
        </div>
    );
};

export default EditForm;
