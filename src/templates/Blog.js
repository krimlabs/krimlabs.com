import React from 'react';
import {useRouteData, Head} from 'react-static';
import {useParams, useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';

import Shell from '../components/Shell';
import PostCard from '../components/PostCard';
import EmojiHeading from "../components/EmojiHeading"
import str from '../utils/string';

import writingHand from "../images/emoji/writing-hand.png";

const YearPosts = ({year, posts, tag}) => {
  const filteredPosts = tag ?
	posts.filter(p => p.data.tags.includes(tag)) :
	posts
  return (<div className="">
	    {year != (new Date()).getFullYear() && filteredPosts.length > 0 &&
	     <h2 className="f3 f3-m f2-l georgia tc">{year}</h2>}
	    <div className="mb6">
	      {filteredPosts .map(p => <PostCard key={p.data.slug} post={p} containerClass="mt4" />)}
	    </div>
	  </div>)
}

const Blog = () => {
  const {allPosts, allPostsByYear} = useRouteData();
  const {search} = useLocation()
  const {tag} = str.queryStringToObj(search.substring(1))

  const topHeading = tag ? `#${tag}` : "All posts"

  const publishYears = Object.keys(allPostsByYear).reverse()
  return (<div style={{backgroundColor: "#FFEEE6"}}>
	    <Head>
	      <title>Krim / Blog</title>
	    </Head>
	    <Shell>
	      <EmojiHeading title={topHeading}
			    emoji={writingHand} />
	      <div className="w-90 center w-80-m w-60-l">
		{publishYears.map(y =>
		  (<YearPosts key={y}
			      year={y}
			      tag={tag}
			      posts={allPostsByYear[y]} />))}
	      </div>
	    </Shell>
	  </div>);
};

export default Blog;
