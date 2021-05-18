import React from "react"
import {Head, useRouteData} from "react-static"

import Shell from "../components/Shell"
import colors from "utils/colors"
import Pinboard from "../components/Pinboard.js"
import PostCard from "../components/PostCard"
import blackHeart from "../images/emoji/black-heart.png";
import loop from "../images/emoji/loop.png";
import books from "../images/emoji/books.png";
import writingHand from "../images/emoji/writing-hand.png";
import hangLoose from "../images/emoji/hang-loose.png";
import speechBubble from "../images/speech-bubble.svg";
import hatMan from "../images/hat-man.svg";

const Block = ({backgroundColor, heading, headingColor, headingEmoji, children, childrenContainerClass}) => {
  return (<section style={{backgroundColor,
			   borderRadius: 16}}
		   className="lh-copy tc w-90 w-80-m w-60-ns center pv4 mt4">
	    <div className="flex justify-center items-center">
	      <h1 className="f1 georgia" style={{color: headingColor}}>{heading}</h1>
	      <img src={headingEmoji} loading="lazy" className="h3 pl3" />
	    </div>
	    <div className={`w-70 center f4 ${childrenContainerClass}`}>
	      {children}
	    </div>
	  </section>)
}

const PostStack = ({post}) =>
      (<div>
       </div>)

const ThankYouInternet = () =>
      (<Block heading={"Thank you internet"}
	      headingEmoji={blackHeart}
	      backgroundColor="#FFE6E6">
	 <p>
	   The world is full of good people who freely share their knowledge and know how.
	 </p>
	 <p>
	   We are grateful to the open-source movement that taught us how to build systems at scale. And we are grateful to countless invisible individuals who published their work in the form of docs, articles, videos and tutorials for us to learn. Krim is our way to give back. Krim is how we close the loop.
	 </p>
       </Block>)

const ClosingTheLoop = () =>
      (<Block heading={"Closing the loop"}
	      headingEmoji={loop}
	      backgroundColor="#FFF6E6">
	 <p>
	   Krim Labs was founded by Shivek Khurana in the year 2017. Initially a consultancy that spun-off from a failed startup, Krim has evolved into publication about building software and software companies. We publish our tutorials, opinions and articles about old and new tech and it’s moral implications. <span className="b">It's our way of giving back to the community</span>.
	 </p>
	 <p>
	   Over 1200 people follow Krim Labs and its author Shivek Khurana on various social platforms and email lists. Our research and publications have reached over 1 million readers over the past 4 years. We care the most about:
	 </p>
       </Block>)

const RecentPosts = () =>
      (<Block heading={"Recent Posts"}
	      headingEmoji={writingHand}
	      backgroundColor="#FFEEE6">
       </Block>)

const HatManSpeaks = ({text}) =>
      (<div className="flex justify-center">
	 <img src={hatMan} alt="Man wearing a hat" className="mt4" />
	 <div className="bg-left white pv5 ph4 w-20"
	      style={{backgroundImage: `url(${speechBubble})`,
		      transform: "rotate(-2deg)"}}
	 >
	   {text}
	 </div>
       </div>)

const ClojureCourse = () =>
      (<Block heading={"Clojure Course"}
	      headingEmoji={books}
	      headingColor="#FFFFFF"
	      childrenContainerClass="white"
	      backgroundColor="#1B1B1B">
	 <p>
	   Clojure is a functional hosted LISP known for its expressiveness. But since it’s not widely used, documented or advocated for, we decided to make a course about it. <span className="b">This course is a distilled form of our Clojure journey over the years.</span>
	 </p>
	 <p>
	   Focused at React.js developers, this course starts from setting up the editor and walks through building a Canva like graphics editor. Complete with authentication, state management, routing and API integration.
	 </p>
       </Block>)

const Subscribe = () =>
      (<Block heading={"Subscribe"}
	      headingEmoji={hangLoose}
	      backgroundColor="#FFE9FB">
	 <p>
	   Join 346 other readers to get latest articles about Clojure, Crypto, privacy and UX delivered straight to your inbox. Free forever. <span className="b">Unsubscribe anytime</span>.
	 </p>
       </Block>)

const Letter = ({className}) => {
  return (<div>
	    <div className={`center w-90 w-70-m w-40-l f5 f4-ns lh-copy pr0 pr0-m pr4-l georgia flex justify-between ${className}`}
		 style={{flex:1}}>
	      <div className="w-20 mt2">
      		<img src="/img/brown-boy.svg" alt="Illustration of a brown boy" className="bb pl3 b--white-20"/>
      	      </div>
      	      <div className="w-70">
      		<p className="b sans-serif o-100">Hi Stranger !</p>
      		<p>My name is Shivek Khurana and <span className="i">Krim Labs is a canopy for my consultancy, products and ideas</span>.</p>
		<Pinboard content={"The site is being upgraded. Everything should work fine but the styling might be off."} />
 	      </div>
	    </div>
	  </div>);
}

const SEO = () => {
  return (<Head>
	    <title>Krim Labs</title>
	    <meta name="keywords" content="shivek khurana, krim labs, clojure, india, new delhi, javascript, react, shivek, krim" />
	    <meta name="robots" content="index, follow" />
	    <meta name="description" content="A canopy for my consultancy, products and ideas." />
	    <meta property="og:url" content="https://krimlabs.com" />
	    <meta property="og:description" content="A canopy for my consultancy, products and ideas." />
	    <meta property="og:title" content="Krim Labs" />
	    <meta property="og:type" content="website" />
	    <meta property="og:image" content={`https://krimlabs.com/img/og.png`} />
	  </Head>);
}

const Landing = () => {
  const {latestPosts, featuredPosts} = useRouteData();
  return (<Shell>
   	    <SEO />
	    <ThankYouInternet />
	    <ClosingTheLoop />
	    <RecentPosts />
	    <HatManSpeaks text={"We love Clojure so much that we made a course about it !!!"} />
	    <ClojureCourse />
	    <Subscribe />
   	    <div className="center">
   	      <Letter className="pt3"/>
   	      <div className="w-90 w-70-ns center flex mt4 mt4-m mt0-l pa0 pa0-m pa4-l" style={{flex: 1}}>
   		<div className="flex flex-column pr2 pr2-m pr4-l" style={{flex: 1}}>
   		  <div className="ttu f7 mb3 b">Latest Posts</div>
   		  <div>{latestPosts.map((p, i) => <PostCard key={i} post={p} small={true} />)}</div>
   		</div>
   		<div className="flex flex-column pl2 pl2-m pl4-l" style={{flex: 1}}>
   		  <div className="ttu f7 mb3 b">Featured Posts</div>
   		  <div>{featuredPosts.map((p, i) => <PostCard key={i} post={p} small={true} />)}</div>
   		</div>
   	      </div>
   	    </div>
   	  </Shell>);
};

export default Landing;
