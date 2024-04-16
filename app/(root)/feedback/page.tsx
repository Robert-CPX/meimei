"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const FeedbackSchema = z.object({
  feedback: z.string().min(20, { message: "feedback must be at least 20 characters" }).max(2000),
})

const Page = () => {
  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      feedback: "",
    },
  })

  function onSubmit(values: z.infer<typeof FeedbackSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4">
              <FormLabel>Things you want to share with me!</FormLabel>
              <FormControl>
                <Textarea placeholder="Add your comment..." {...field} className="grow basis-[360px]" />
              </FormControl>
              <FormMessage className="text-error" />
            </FormItem>
          )}
        />
        <Button type="submit" className="mx-6 mb-8 rounded-[20px] bg-primary">Submit</Button>
      </form>
    </Form>
  )
}

export default Page
