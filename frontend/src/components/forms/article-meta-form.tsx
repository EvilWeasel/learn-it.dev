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
import { AspectRatio } from "../ui/aspect-ratio";
import { Label } from "../ui/label";
import { useState } from "react";

interface ArticleMetaFormProps {
  articleId: string;
  initialTitle: string;
  initialDescription: string;
  initialImageUrl?: string;
}

const formSchema = z.object({
  title: z.string().min(5).max(40),
  description: z.string().max(250),
  image: z.instanceof(File).optional(),
});

export function ArticleMetaForm({
  articleId,
  initialDescription,
  initialTitle,
  initialImageUrl,
}: ArticleMetaFormProps) {
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl || "");

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
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.image) {
        formData.append("image", values.image);
      }
      console.log("formData:", formData.values);
      const result = await fetch(`/api/article/${articleId}`, {
        method: "PATCH",
        body: formData,
      });
      if (result.ok) {
        const updatedPost = await result.json();
        setImageUrl(updatedPost.image);
        console.log(
          "Editor content saved successfully:",
          result.status,
          updatedPost,
        );
      } else {
        console.error("Failed to save editor content:", result.statusText);
      }
    } catch (error) {
      console.error("Failed to save editor content:", error);
    }
  };

  const filePickerOptions = {
    types: [
      {
        description: "Images",
        accept: {
          "image/*": [".png", ".gif", ".jpeg", ".jpg", ".webp", ".avif"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };

  const showFilepicker = async () => {
    const myWindow = window as any;
    const [handle] = await myWindow.showOpenFilePicker(filePickerOptions);
    if (!handle) return;
    console.log("File picked:", await handle.getFile());
    form.setValue("image", await handle.getFile());
  };

  return (
    <Collapsible className="relative">
      <CollapsibleTrigger>
        <Button>Article-Settings</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="absolute z-50 mb-4 mt-2 w-full rounded-lg border-2 border-slate-500/20 bg-slate-900 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <div className="w-[50%]">
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
            </div>
            <div className="align-end flex h-auto w-[50%] flex-col">
              {initialImageUrl ? (
                <AspectRatio ratio={16 / 9} onClick={showFilepicker}>
                  <img
                    src={imageUrl}
                    alt="Article Hero Image"
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              ) : (
                <FormItem className="w-full">
                  <FormLabel>Hero</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full py-2"
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files)
                          form.setValue("image", e.target.files[0]);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
              <Button type="submit" className="mt-2 md:ml-auto">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
}
