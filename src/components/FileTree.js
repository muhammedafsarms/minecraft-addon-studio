export default function FileTree({
  files,
  onSelect
}) {

  return (
    <div className="p-4">

      <h2 className="font-bold mb-4">
        Project Files
      </h2>

      {files.map((file,index)=>(
        <div
          key={index}
          onClick={()=>onSelect(file)}
          className="
            cursor-pointer
            p-2
            rounded
            hover:bg-zinc-800
          "
        >
          📄 {file.path}
        </div>
      ))}

    </div>
  );

}