export interface Feed {
  id: number;
  name: string;
  university: string;
  country: string;
  title: string;
  content: string;
  imageUrls: string[];
  profileImageUrl: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  isFeedOwner: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
  isProfileImageUpload: boolean;
  createdDate: string;
}
