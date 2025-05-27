import { Editor } from "@tinymce/tinymce-react";

// TinyMCE so the global var exists
import "tinymce/tinymce";
// DOM model
import "tinymce/models/dom/model";
// Theme
import "tinymce/themes/silver";
// Toolbar icons
import "tinymce/icons/default";
// Editor styles
import "tinymce/skins/ui/oxide/skin";

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/help/js/i18n/keynav/en";
import "tinymce/plugins/image";
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

// importing plugin resources
import "tinymce/plugins/emoticons/js/emojis";

// Content styles, including inline UI like fake cursors
import "tinymce/skins/content/default/content";
import "tinymce/skins/ui/oxide/content";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import databaseService from "@/appwrite/Database/database";
import { showErrorToast, showSuccessToast } from "./toast";
import { clearEditingNotice } from "@/features/noticeSlice";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

export default function RTE(props) {
  const queryClient = useQueryClient();
  const { isEditing, editingNotice } = useSelector((state) => state.notice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const { username: author, roles } = useSelector((state) => state.auth.user);
  const handleCreate = async (data) => {
    console.log("data", data);

    const response = await databaseService.createNotice({
      author,
      message: data.content,
      subject: data.subject,
      role: roles[0],
    });

    setSubmitting(true);

    if (response) {
      showSuccessToast("Notice Published Sucessfully!");
      setSubmitting(false);
      reset();
      queryClient.invalidateQueries(["notices"]);
      return;
    }
    showErrorToast("Error Publishing Notice");
    setSubmitting(false);
  };
  const handleUpdate = async (data) => {
    console.log("data", data);

    const response = await databaseService.updateNotice({
      adjustObject: {
        author,
        message: data.content,
        subject: data.subject,
        role: roles[0],
      },
      documentID: editingNotice.$id,
    });

    setSubmitting(true);

    if (response) {
      showSuccessToast("Notice Updated Sucessfully!");
      setSubmitting(false);
      navigate("/notice");
      queryClient.invalidateQueries(["notices"]);
      dispatch(clearEditingNotice());
      return;
    }
    showErrorToast("Error updating Notice");
    setSubmitting(false);
  };
  useEffect(() => {
    if (isEditing) {
      setValue("subject", editingNotice.subject);
      setValue("content", editingNotice.message);
    }
  }, []);

  return (
    <form
      {...props}
      className="flex flex-col items-center z-0"
      onSubmit={
        isEditing ? handleSubmit(handleUpdate) : handleSubmit(handleCreate)
      }
    >
      <input
        {...register("subject", {
          required: true,
          validate: (value) =>
            value.trim().length >= 5 || "Heading must be at least 5 characters",
        })}
        type="text"
        name="subject"
        id="subject"
        className="mt-5 text-lg bg-white mb-0 p-1 rounded shadow w-full"
        placeholder="Enter subject of notice"
      />
      {errors.subject && (
        <p className="text-sm text-red-400">{errors.subject.message}</p>
      )}
      <Controller
        name="content"
        control={control}
        defaultValue={""} // for update
        render={({ field: { value, onChange } }) => (
          <Editor
            value={value}
            onEditorChange={onChange}
            rules={{
              validate: (value) =>
                value.trim().length >= 5 || "Enter Meaningful Notice",
            }}
            init={{
              height: "80dvh",
              max_height: "200dvh",
              width: "100%",
              menubar: false,
              plugins: [
                "advlist",
                "anchor",
                "autolink",
                "help",
                "image",
                "link",
                "lists",
                "searchreplace",
                "table",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px ; z-index:0;}",
            }}
          />
        )}
      />
      {errors.content && (
        <p className="text-sm text-red-400">{errors.content.message}</p>
      )}
      <button
        type="submit"
        className="mt-4 bg-zinc-800 hover:bg-zinc-600 text-white p-2 rounded"
      >
        {submitting ? "Publishing..." : "Publish"}
      </button>
    </form>
  );
}
