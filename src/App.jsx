import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPostPage from './pages/BlogPostPage';
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/posts/:id" element={<BlogPostPage/>} />
        <Route exact path="/create" element={<CreateBlogPage/>} />
        <Route exact path="/edit/:id" element={<EditBlogPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
