import './Title.css'

export default function Title({ children, sub, action }) {
  return (
    <div className="title">
      <div>
        <h2 className="title__text">{children}</h2>
        {sub && <p className="title__sub muted">{sub}</p>}
      </div>
      {action}
    </div>
  )
}