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
import { useState } from "react";
import { useSelector } from "react-redux";
import databaseService from "@/appwrite/Database/database";
import { showErrorToast, showSuccessToast } from "./toast";
export default function RTE(props) {
  const { handleSubmit, control } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const author = useSelector((state) => state.auth.user.username);
  const onSubmit = async (data) => {
    setSubmitting(true);
    const response = await databaseService.createNotice({
      author,
      message: JSON.stringify(data),
      subject: "Test",
    });
    if (response) {
      showSuccessToast("Notice Published Sucessfully!");
      setSubmitting(false);
      return;
    }
    showErrorToast("Error Publishing Notice");
    setSubmitting(false);
  };
  return (
    <form
      {...props}
      className="flex flex-col items-center z-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="content"
        control={control}
        defaultValue={""} // for update
        render={({ field: { value, onChange } }) => (
          <Editor
            value={value}
            onEditorChange={onChange}
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
      <button
        type="submit"
        className="mt-4 bg-indigo-500 hover:bg-indigo-400 text-white p-2 rounded"
      >
        {submitting ? "Publishing..." : "Publish"}
      </button>
    </form>
  );
}
