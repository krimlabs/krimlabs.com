import React from "react";
import {Link} from "react-router-dom";

import str from "../utils/string";
import img from "../utils/image";
import "./postCard.css"

const AuthorBar = ({author, publishedOn}) => {
  const optimizedPaths = img.getOptimizedPaths(author.profilePicture)
  return (<div className="flex flex-column flex-row-m flex-row-l justify-between items-center bt b--black-20 ph3 ph4-l mt3 pb2 pt1 f7 f6-l">
	    <div className="flex flex-column flex-row-m flex-row-l items-center">
	      <img src={optimizedPaths.w80}
		   className="br-100 mt1"
		   alt={author.name}
		   style={{height: 28,
			   width: 28}}
	      />
	      <span className="pl1 pl2-l mt2 mt0-m mt0-l">By {author.name}</span>
	    </div>
	    <div className="black-80">
	      {str.humanReadableDate(publishedOn)}
	    </div>
	  </div>)
}

const stackClass = (additional) => `br4 br--top h1 bg-white center ${additional}`
const stackStyle = {boxShadow: "0 2px 7px 0 rgba(0, 0, 0, 0.3)"}
const Stack = () =>
      (<div className="w-100">
	 <div className={stackClass("w-80")} style={stackStyle} />
	 <div className={stackClass("w-90")} style={stackStyle} />
       </div>)

// TODO: Remove small prop from usage
const PostCard = ({post, leftTopTitle, stacked}) => {
  const {title, heroImg, subTitle, tags, publishedOn, author} = post.data;
  return (<Link to={post.path} className="">
	    {stacked && <Stack />}
	    <div className="flex flex-column bg-white br4 postCard"
		 style={{boxShadow: "0 2px 7px 0 rgba(0, 0, 0, 0.3)"}}
	    >
	      <div className="tl ttu f7 b black-40 ph3 ph4-l pt2">
		{leftTopTitle}
	      </div>
	      <div className="flex items-center pt3 ph3 ph4-l">
		<div className="coverContainer" style={{}}>
		  {heroImg && <img
				loading="lazy"
				className="cover"
				srcSet={img.getSrcSet(heroImg)}
				src={img.getOgSrc(heroImg)}
				alt={`${title} - cover image`} />}
		</div>
		<div className="pl3">
		  <div className="tl b f6 f5-m f4-l">{title}</div>
		  {subTitle && <div className="mt1 black-80 f4">{subTitle}</div>}
		</div>
	      </div>

	      {author.name && <AuthorBar author={author} publishedOn={publishedOn} />}
	    </div>
	  </Link>)
}

export default PostCard;
