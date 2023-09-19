"use client";

import * as z from "zod";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/useOrigin";

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFromValues = z.infer<typeof formSchema>;

const SettingsForm = ({ store }: { store: Store }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const form = useForm<SettingsFromValues>({
    resolver: zodResolver(formSchema),
    defaultValues: store,
  });

  const onSubmit = async (data: SettingsFromValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Store updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted");
    } catch (error) {
      toast.error("Make sure you removed all products and categories first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        onConfirm={onDelete}
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" label="Manage store preferences" />
        <Button
          disabled={loading}
          variant={"destructive"}
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4 mr-2" />
          Remove store
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        variant="public"
        title="NEXT_PUBLIC_API_URL"
        desc={`${origin}/api/${params.storeId}`}
      />
    </>
  );
};

export default SettingsForm;
