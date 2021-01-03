export default function SelectionItem({name}) {

  return (
    <div>
      {name}
      <style jsx>{`
        div {
          margin-bottom: 12px;
          font-size: 2.5rem;
        }
        `}
      </style>
    </div>
  )
}
