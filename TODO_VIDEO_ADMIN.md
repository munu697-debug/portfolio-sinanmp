# Video/Categories Admin + Dashboard (RTDB)

## Done
- ✅ Fix admin login password mismatch in `admin.html`.

## Pending
1. Add Admin UI sections in `admin.html`:
   - Categories editor (RTDB: `/categories/current/items`)
     - Add + Remove + inline edit (name, order, optional featured)
   - Videos editor (RTDB: `/videos/current/items`)
     - Add + Remove + inline edit (title, youtubeUrl, thumbnailUrl, description, category, order, featured)
   - Save buttons for both sections.
2. Add RTDB helpers in `admin.html` for categories/videos:
   - loadCategories/loadVideos
   - saveCategories/saveVideos
   - render functions.
3. Update `dashboard.html` to display videos:
   - Read `/videos/current/items` (fallback defaults if empty)
   - Optional: filter by categories.
4. Optional update `index.html` to render same videos instead of static Work cards.

