import React from "react"
import {Link} from "react-router-dom"

import Shell from "../components/Shell"
import {TinycanvaNav} from "../components/Nav"
import SEO from "../components/SEO"
import array from "../utils/array"
import YoutubeEmbed from "../components/YoutubeEmbed"
import {qAndAs, features} from "./tinycanva/data.js"

import newlineLogo from "../images/newline-logo-white.svg"
import bankNote from "../images/emoji/dollar-banknote.png"

const ShivekKhuranaAndNewline = () =>
      (<div className="flex justify-center items-center">
	 <Link to="/authors/shivekkhurana" className="mh2 underline b">Shivek Khurana</Link> and
	 <a href="https://newline.co" className="dib">
	   <img className="h2 mh2 white pt1"
		src={newlineLogo}
		alt="Newline.co Logo" />
	 </a>
	 presents
       </div>)

const Header = () =>
      (<header className="mt5">
	 <ShivekKhuranaAndNewline />

	 <h1 className="georgia f1 mt4 tc">
	   Tinycanva: Clojure for React Developers
	 </h1>

	 <h2 className="f3 normal white-60 tc">
	   A course on building a web-based graphics editor with Clojure.
	 </h2>

	 <YoutubeEmbed youtubeId="O2x2YdCH9Eg" containerClass="mt5"/>
       </header>)

const QAndA = ({emoji, question, answer: Answer}) =>
      (<div style={{width: "calc(48% - 24px)"}}
	    className="mt4">
	 <img src={emoji} className="" style={{height: 40, width: 40}} />
	 <div className="georgia f2 mt2">{question}</div>
	 <div className="mt4 lh-copy f4"><Answer /></div>
       </div>)

const QAndAGrid = () =>
      (<div id="faq"
	    className="mt4 flex justify-between flex-wrap">
	 {qAndAs.map(qa => <QAndA key={qa.question} {...qa} />)}
       </div>)

const Feature = ({title, body, containerClass}) =>
      (<div className={`mb3 ${containerClass}`}>
	 <div>{title}</div>
	 <div className="mt2 white-50">{body}</div>
       </div>)

const freeFeatures = features.filter(f => f.free)
const paidFeatures = features.filter(f => !f.free)

const PricingPlanHeader = ({price, title, subTitle}) =>
      (<div className="mt3 mb3 bb pb4 b--white-40">
	 <div className="f1 georgia mb4">{price}</div>
	 <div className="f3 b mb1">{title}</div>
	 <div className="h1 f5 i white-70">{subTitle}</div>
       </div>)

const PricingSectionHeader = () =>
      (<div className="flex items-center justify-between">
	 <h1 className="f2 georgia b">Pricing</h1>
	 <img src={bankNote} className="dib h2" />
       </div>)

const Plans = () =>
      (<div className="flex justify-between">
 	 <div style={{width: "calc(33.33% - 24px)"}}
	      className="">
	   <PricingPlanHeader price="$ 0.00"
			      title="Reduce Mode" />
 	   {freeFeatures.map(f => <Feature key={f.title} {...f} />)}
 	 </div>

	 <div style={{width: "calc(66.66% - 24px)"}}
	      className="">
	   <PricingPlanHeader price="$ 49.00"
			      title="Transduce Mode"
			      subTitle="Everything in Reduce Mode plus"/>
	   <div className="flex justify-between">
 	     {array.partition(paidFeatures, paidFeatures.length/2)
	      .map((part, i) =>
		(<div key={`fetaures-part-${i}`}
		      style={{width: "calc(50% - 24px)"}}
		      className="">
	  	   {part.map(f => <Feature key={f.title} {...f} />)}
	         </div>))}
	   </div>
	 </div>
       </div>)

const Purchase = () =>
      (<>
	 <div className="flex justify-between b f4 mt4">
	   <div style={{width: "calc(33.33% - 24px)"}}
		className="link pointer bg-white black br3 pv2 br3 tc">
	     Enroll Free
	   </div>

	   <div style={{width: "calc(66.66% - 24px)",
			backgroundColor: "#2A6A5E"}}
		className="link pointer white br2 pv2 br3 tc">
	     Enroll Full ($ 49.00)
	   </div>
	 </div>

	 <div className="f6 white-50 mt3">
	   Enrollments, payments and course delivery is handled by Newline.
	 </div>
       </>)

const Pricing = () =>
      (<section id="pricing"
		className="ba bw2 br4 ph4 b--white-80 mt5 pb5">
	 <PricingSectionHeader />
	 <Plans />
	 <Purchase />
       </section>)

const Tinycanva = () =>
      (<div className="white"
	    style={{backgroundColor: "#1B1B1B"}}>
	 <Shell nav={TinycanvaNav}>
	   <SEO title="Krim / Tinycanva - Clojure for React developert"
		tags="clojure,course,react,clojure app" />
	   <div className="w-90 w-80-m w-60-ns center">
	     <Header />
	     <QAndAGrid />
	     <Pricing />
	   </div>
	 </Shell>
       </div>)

export default Tinycanva
