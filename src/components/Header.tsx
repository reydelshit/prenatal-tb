export default function Header({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="h-[8rem] border-2 px-5 flex flex-col justify-center mb-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p>{description}</p>
    </div>
  )
}
