export default function FileViewer({
  selectedFile
}) {

  if(!selectedFile){

    return(
      <div className="p-4">
        Select a file
      </div>
    );

  }

  return(

    <div className="p-4 h-full overflow-auto">

      <h2 className="font-bold mb-4">
        {selectedFile.path}
      </h2>

      <pre
        className="
        bg-zinc-900
        p-4
        rounded-lg
        whitespace-pre-wrap
      "
      >
        {selectedFile.content}
      </pre>

    </div>

  );

}