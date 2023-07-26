import React from 'react';
import styles from '../../styles/Post.module.css';
import { useCurrentUser} from '../../contexts/CurrentUserContext';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropDown } from '../../components/MoreDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Post = (props) => {
    const {
      id,
      owner,
      profile_id,
      profile_image,
      comments_count,
      likes_count,
      like_id,
      title,
      content,
      image,
      updated_at,
      postPage,
      setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner
    const history = useHistory();

    const handleEdit = () => {
      history.push(`/posts/${id}/edit`)
    }

    const handleDelete = async () => {
      try {
        await axiosRes.delete(`posts/${id}/`);
        history.goBack();
      } catch (err) {
        // console.log(err);
      }
    }

    const handleLike = async () => {
        try {
            const {data} = await axiosRes.post('/likes', {post:id})
            setPosts((prevPosts) => ({
              ...prevPosts,
              results: prevPosts.results.map((post) => {
                return post.id === id
                  ? {
                      ...post,
                      likes_count: post.likes_count + 1,
                      like_id: data.id,
                    }
                  : post;
              }),
            }));
        } catch(err) {
            // console.log(err)
        }
    }

    const handleUnike = async () => {
        try {
            const {data} = await axiosRes.delete('/likes', {post:id})
            setPosts((prevPosts) => ({
              ...prevPosts,
              results: prevPosts.results.map((post) => {
                return post.id === id
                    ? {
                        ...post,
                        likes_count: post.likes_count - 1,
                        like_id: null,
                    }
                    : post;
                }),
            }));
        } catch(err) {
            // console.log(err)
        }
    }

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify_content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && (
              <MoreDropDown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnike}>
              <i className={`fas fa_heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
            {comments_count}
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Post;