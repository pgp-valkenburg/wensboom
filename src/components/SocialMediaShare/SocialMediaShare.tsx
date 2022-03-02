import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import styles from "./SocialMediaShare.module.css";

type Props = {
  url: string;
  pageTitle: string;
  message: string;
  hashTag: string;
};

const ICON_SIZE = 36;

export const SocialMediaShare: React.VFC<Props> = ({
  message,
  url,
  pageTitle,
  hashTag,
}) => (
  <>
    <p className={styles.sharePreview}>{message}</p>
    <div className={styles.shareBar}>
      <FacebookShareButton url={url} quote={message} hashtag={hashTag}>
        <FacebookIcon size={ICON_SIZE} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={message} hashtags={[hashTag]}>
        <TwitterIcon size={ICON_SIZE} round={true} />
      </TwitterShareButton>
      <LinkedinShareButton url={url} summary={message} title={pageTitle}>
        <LinkedinIcon size={ICON_SIZE} round={true} />
      </LinkedinShareButton>
    </div>
  </>
);
