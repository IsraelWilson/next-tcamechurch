export default function Progress(props) {
  return (
    <div>
      <h4>{props.name}</h4>
      <progress value={props.value} max="100"></progress>
      <style jsx>{`

        h4 {
          margin-bottom: 1.5rem;
        }

        progress[value] {
          -webkit-appearance: none;
          appearance: none;
          margin-bottom: 2rem;
          border: 0 none;
        }

        progress[value]::-webkit-progress-bar {
          background-color: #eee;
          border-radius: 14px;
          box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2);
          padding: 2px 1px 1px;
        }

        progress[value]::-webkit-progress-value {
          border-radius: 12px;
          background: #feda6a;
          box-shadow: inset 0px -2px 4px rgba(0,0,0,0.4), 0 2px 5px 0px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  )
}
