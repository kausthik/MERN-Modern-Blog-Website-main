import { Button, Spinner,Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';

export default function PostPage() {

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false); 
  const [showModal, setShowModal] = useState(false);  
  const [likesDislikesDetails, setLikesDislikesDetails] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLikes(data.posts[0].likes.length);
          setDislikes(data.posts[0].dislikes.length);
          setUserLiked(data.posts[0].likes.includes(currentUser?._id)); 
          setUserDisliked(data.posts[0].dislikes.includes(currentUser?._id));
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  console.log("likesDislikesDetails",likesDislikesDetails)

  const handleLike = async () => {
    try {
      console.log("inn",currentUser)
      if (!currentUser) {
        navigat('/sign-in');
        return;
      }
      const res = await fetch(`/api/post/like/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) {
        setLikes(data.likes.length);
        setDislikes(data.dislikes.length);
        setUserLiked(!userLiked); 
        if (userDisliked) setUserDisliked(false); 
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDislike = async () => {
    if (!currentUser) {
      navigate('/sign-in');
      return;
    }
    try {
      const res = await fetch(`/api/post/dislike/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) {
        setLikes(data.likes.length);
        setDislikes(data.dislikes.length);
        setUserDisliked(!userDisliked);
        if (userLiked) setUserLiked(false); 
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchLikesDislikesDetails = async () => {
    try {
      const res = await fetch(`/api/post/likes-dislikes/${post._id}`);
      const data = await res.json();
      if (res.ok) {
        setLikesDislikesDetails(data);
        setShowModal(true); 
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span className='flex items-center justify-center' >{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <div className='flex items-center justify-center'>
        <Button onClick={handleLike} color={userLiked ? 'green' : 'gray'}>
          👍 {likes}
        </Button>
        <Button onClick={handleDislike} color={userDisliked ? 'red' : 'gray'} className='ml-5'>
          👎 {dislikes}
        </Button>
        {currentUser && currentUser.isAdmin && (
        <div className='ml-5'>
          <Button onClick={fetchLikesDislikesDetails}>
            View Like/Dislike Details
          </Button>
        </div>
      )}
      </div>

        <span className='italic flex items-center justify-center'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      {/* Like and Dislike Buttons */}
      
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <CommentSection postId={post._id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          Like and Dislike Details
        </Modal.Header>
        <Modal.Body>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Liked Users */}
          <div>
            <h3 className="text-lg font-bold mb-4">Users who liked:</h3>
            <ul className="space-y-4">
              {likesDislikesDetails?.likes?.map((user) => (
                <li key={user._id} className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Disliked Users */}
          <div>
            <h3 className="text-lg font-bold mb-4">Users who disliked:</h3>
            <ul className="space-y-4">
              {likesDislikesDetails?.dislikes?.map((user) => (
                <li key={user._id} className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
