import { SHOP } from '../config'
import './About.css'

export default function About() {
  return (
    <div className="about page">
      <h1 className="about__title">About {SHOP.name}</h1>
      <div className="about__text">
        <p>We sell new and used phones from the brands people in this area ask for most. Every phone is checked in the shop before it goes on the shelf.</p>
        <p>This website shows what we have in stock today, with the real price. If you see a phone you like, message us on WhatsApp or come to the shop and see it in person.</p>
      </div>
      <dl className="about__info">
        <div className="about__box"><dt className="muted">Address</dt><dd>{SHOP.address}</dd></div>
        <div className="about__box"><dt className="muted">Opening hours</dt><dd>{SHOP.hours}</dd></div>
      </dl>
    </div>
  )
}