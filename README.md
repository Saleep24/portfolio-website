# saleepshrestha.com.np

Personal site. Static HTML, one stylesheet and one script, no build step. GitHub Pages serves `main`.

## Run

```
python3 -m http.server
```

Open http://localhost:8000.

## Files

```
index.html         home page: hero, experience, projects, recognition, writing, contact
blog.html          list of posts
blog-post-*.html   one file per post
css/style.css      all styles; design tokens are the :root block at the top
js/script.js       theme toggle, phone menu, contact form, video autoplay, footer crossfade
assets/            headshot, logos, badges, certificates, resume, demo videos with poster frames
```

## Edit

- Add an experience row: copy an `<article class="entry">` in `index.html`.
- Add a project: copy a `<article class="tile">` for one with a video, or an `<article>` in `.more` for a text row.
- Add a video: encode to 1280px H.264 mp4 with a jpg poster frame, both in `assets/video`. Use a new filename when replacing one so browsers don't serve the cached copy.
- Add a post: copy a post file, then add a row to the writing list in `index.html` and `blog.html`.
- Theme is dark by default and remembers the visitor's toggle. Colors live in `:root` and `[data-theme="dark"]` in `css/style.css`.
- The contact form posts to Formspree and shows the result inline.
