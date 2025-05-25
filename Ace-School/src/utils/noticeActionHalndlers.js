import { showSuccessToast, showErrorToast } from "@/components/Templates/toast";

export const handleNoticeUpdate = ({ dispatch, navigate }) => {
    dispatch(setEditingNotice(notice));
    navigate("/notice/update");
};
export const handleNoticeDelete = async ({ setDeleting, queryClient }) => {
    setDeleting(false);
    const response = await databaseService.deleteNotice(notice.$id);
    if (response === true) {
        showSuccessToast("Notice deleted sucessfully !");
        setDeleting(false);
        queryClient.invalidateQueries(["notices"]);
        return;
    }
    setDeleting(false);
    showErrorToast("Error deleting message !");
};