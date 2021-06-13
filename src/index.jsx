import ForgeUI, { render, Text, Button, ContentAction, ModalDialog, useState, useProductContext } from '@forge/ui';
import {getAttachments, removeAttachment} from "./attachments";

const App = () => {
  const [isOpen, setOpen] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [listShown, setListShown] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const { contentId } = useProductContext();
  if (!isOpen) {
    return null;
  }

  return (
    <ModalDialog header="Bulk Delete Attachments" onClose={() => setOpen(false)} closeButtonText="Close">
        <Text>List attachments and then delete.</Text>
        <Button
          text="List attachments"
          onClick={async () => {
            await getAttachments(contentId).then(value=>{
                setAttachments(value.results)
                value.results.length>0 ? setListShown(true) : setListShown(false)
            });
          }}
          disabled={listShown}
        />
        {attachments.map(x=>{return <Text>{x.title}</Text>})}
        <Button
            text="Delete"
            onClick={()=>{
                const promises = attachments.map( x=>{ removeAttachment(x.id, x.title) })
                Promise.all(promises).then(setMessage("File(s) deleted.")).then(setCompleted(true))
                }
            }
            disabled={!listShown || completed}
        />
        <Text>{message}</Text>
    </ModalDialog>
  );
};

export const run = render(
  <ContentAction>
    <App/>
  </ContentAction>
);
