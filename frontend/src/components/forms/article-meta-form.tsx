"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ArticleMetaFormProps {
  articleId: string;
  initialTitle: string;
  initialDescription: string;
}

const formSchema = z.object({
  title: z.string().min(5).max(40),
  description: z.string().max(250),
  // todo: add image field
});

export function ArticleMetaForm({
  articleId,
  initialDescription,
  initialTitle,
}: ArticleMetaFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialTitle,
      description: initialDescription,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // todo: implement patching article
    // todo: close collapsible on submit
    try {
      console.log("Article Meta changed:");
      console.log(JSON.stringify(values));
      const result = await fetch(`/api/article/${articleId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (result.ok) {
        console.log(
          "Editor content saved successfully:",
          result.status,
          result.body,
        );
      } else {
        console.error("Failed to save editor content:", result.statusText);
      }
    } catch (error) {
      console.error("Failed to save editor content:", error);
    }
    console.log(values);
  };

  return (
    <Collapsible className="relative">
      <CollapsibleTrigger>
        <Button>Article-Settings</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="absolute z-50 mb-4 mt-2 w-[400px] rounded-lg border-2 border-slate-500/20 bg-slate-900 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Der Titel sollte zwischen 5 und 40 Zeichen lang sein.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Die Beschreibung sollte maximal 250 Zeichen lang sein.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
}
