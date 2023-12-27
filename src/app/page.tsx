import { uploadThing } from '@/uploadthing';
import { Grid } from '@/components/grid';

const getFiles = async () => {
  const files = await uploadThing.listFiles({
    limit: 50,
    offset: 0,
  });

  const uploadedFiles = files.filter((file) => file.status === 'Uploaded');
  return await uploadThing.getFileUrls(uploadedFiles.map((file) => file.key));
};

export default async function Home() {
  const files = await getFiles();
  return <Grid files={files} />;
}
