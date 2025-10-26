import { Post, Expert } from '../models/Community.js';

export const createPost = async (req, res) => {
  const post = await Post.create({ userId:req.user.id, ...req.body });
  res.status(201).json({ post });
};

export const getPosts = async (req, res) => {
  const { limit=20 } = req.query;
  const posts = await Post.find().populate('userId','displayName').sort({createdAt:-1}).limit(Number(limit));
  res.json({ posts });
};

export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('userId','displayName');
  if (!post) return res.status(404).json({ message:'Not found' });
  res.json({ post });
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const i = post.likes.findIndex(u=>u.toString()===req.user.id);
  i===-1?post.likes.push(req.user.id):post.likes.splice(i,1);
  await post.save();
  res.json({ likes:post.likes.length });
};

export const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ userId:req.user.id, content:req.body.content });
  await post.save();
  res.json({ comments:post.comments.length });
};

export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message:'Deleted' });
};

export const getExperts = async (req, res) => {
  const experts = await Expert.find({ verified:true }).populate('userId','displayName');
  res.json({ experts });
};

export const getExpertById = async (req, res) => { /* similar to getPostById */ };

export const createExpert = async (req, res) => { /* simple create */ };

export const bookExpert = async (req, res) => { /* booking logic */ };

export const getMyBookings = async (req, res) => { /* fetch bookings */ };
