// ==============================
// 🔥 DISABLE BROWSER SCROLL RESTORATION
// ==============================
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

let filteredBlogData = [];
let isSearching = false;

// ==============================
// BLOG FILES
// ==============================
// Ensure these paths match your folder structure exactly (lowercase 'blogs')
const blogs = [
  "blogs/myosa-submission-guidelines.md",
  "blogs/myosa-forest-sentinel.md",
  "blogs/athletIQ.md",
  "blogs/tu-ankaja.md",
  "blogs/bio-inspired-spiral-soft-robotic-gripper.md",
  "blogs/sanjeevani-ai.md",
  "blogs/pulseenv.md",
  "blogs/vitalrest-prototype-1.md",
  "blogs/terrasafe.md",
  "blogs/swarmsense.md",
  "blogs/ergonomic-biomechanics-and-active-feedback-system(2nd).md",
  "blogs/smart-lumbar-trainer.md",
  "blogs/myosa-interactive-learning-robot-myopet.md",
  "blogs/myosa-pothole-detection.md",
  "blogs/myosa-gesture-control-system-main.md",
  "blogs/myosa-baby-monitor.md",
  "blogs/myosa-drowsiness.md",
  "blogs/smartpass-crowd-safety.md",
  "blogs/myosa-ppt-controller.md",
  "blogs/myosa-smart-helmet.md",
  "blogs/project-drishti.md",
  "blogs/kairos(13th).md",
  "blogs/myotrack.md",
  "blogs/caregiver.md",
  "blogs/Smart Building.md",
  "blogs/bio-inspired-spiral-soft-robotic-gripper.md",
  "blogs/sanjeevani-ai.md",
  "blogs/myosa_revive.md",
  "blogs/myosa-warehouse.md",
  "blogs/myosa-smartBioAir.md",
  "blogs/retry-fault-detection.md",
  "blogs/smart-butterfly.md",
  "blogs/TejasARK.md",
  "blogs/myosa-secure-ride-system.md",
  "blogs/lifelink-neonatal-blackbox.md",
  "blogs/sherpa.md",
  "blogs/smart-vest-myosa.md",
  "blogs/lumina.md",
  "blogs/safesite-worker-safety-monitor.md",
  "blogs/fault-detection(18th).md",
   "blogs/resqpulse.md",
  "blogs/myosa-digital-twin.md",
   "blogs/myosa-autonomous-rail-patrol-robot.md",
   "blogs/drug-cold-chain-sentinel.md",
  "blogs/MYOSA-Blog-MD.md",
  "blogs/wearable-asthma-monitor-for-children.md",
  "blogs/AuraNode.md",
   "blogs/myosa-steadygrip.md",
  "blogs/VIGILLIFT.md",
  "blogs/agrolumen-spodoptera.md",
  "blogs/myosa-ecoflame.md",
  "blogs/myosa-hoic-system.md",
  "blogs/neosentry.md",
  "blogs/structsense.md",
  "blogs/smartsecnc.md",
  "blogs/kineguard-real-time-kinematic-constraint-enforcement-system.md",
   "blogs/sitx.md"
];

// ==============================
// PAGINATION CONFIG
// ==============================
const BLOGS_PER_PAGE = 6; 
let currentPage = 1;
let allBlogData = [];

// ==============================
// DATE FORMATTER
// ==============================
function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    });
  } catch (e) {
    return dateStr;
  }
}

// ==============================
// BLOG LIST PAGE
// ==============================
const blogList = document.getElementById("blogList");

if (blogList) {
  console.log("Loading blogs...");
  
  Promise.all(
    blogs.map(async (path) => {
      try {
        // Encode URI to handle parentheses in filenames
        const res = await fetch(encodeURI(path)); 
        if (!res.ok) {
          console.warn(`Cannot load ${path}: ${res.status}`);
          return null;
        }
        const text = await res.text();

        const cleanedText = text.replace(/^\uFEFF/, "");
        const fm = cleanedText.match(/---([\s\S]*?)---/);

        if (!fm) {
          console.warn(`No frontmatter found in ${path}`);
          return null;
        }

        const meta = fm[1];
        const title = meta.match(/title:\s*(.+)/)?.[1]?.trim() ?? "Untitled";
        const dateRaw = meta.match(/publishDate:\s*(.+)/)?.[1]?.trim() ?? "";
        const image = meta.match(/image:\s*(.+)/)?.[1]?.trim();
        
        const contentAfterFM = text.replace(/^---[\s\S]*?---/, "").trim();
        const firstPara = contentAfterFM.split('\n\n')[0]?.replace(/[#*_\[\]]/g, '').trim() || "";
        const excerpt = firstPara.length > 150 ? firstPara.substring(0, 150) + "..." : firstPara;

        return {
          path,
          title,
          date: dateRaw ? new Date(dateRaw) : new Date(0), // Default to old date if missing
          dateText: dateRaw || "No date",
          image,
          excerpt
        };
      } catch (err) {
        console.error(`Error loading ${path}:`, err);
        return null;
      }
    })
  ).then((data) => {
    allBlogData = data
      .filter(Boolean)
      .sort((a, b) => b.date - a.date);

    if (allBlogData.length === 0) {
      blogList.innerHTML = "<p style='text-align:center; padding:40px; color:#9ca3af; grid-column: 1/-1;'>No blogs found. Please check your /blogs/ folder.</p>";
      return;
    }

    renderPage(1);
  }).catch(err => {
    console.error("Error loading blogs:", err);
    blogList.innerHTML = "<p style='text-align:center; padding:40px; color:#ef4444; grid-column: 1/-1;'>Error loading blogs.</p>";
  });
}

function renderPage(page) {
  if (allBlogData.length === 0) return;
  
  const totalPages = Math.ceil(allBlogData.length / BLOGS_PER_PAGE);
  if (page < 1 || page > totalPages) return;

  currentPage = page;
  blogList.innerHTML = "";

  const start = (page - 1) * BLOGS_PER_PAGE;
  const end = start + BLOGS_PER_PAGE;

  allBlogData.slice(start, end).forEach(blog => {
    const card = document.createElement("div");
    card.className = "blog-card";

    card.onclick = () => {
      sessionStorage.setItem("fromBlogList", "true");
      // Redirect using the path already containing 'blogs/'
      window.location.href = `blog.html?file=${encodeURIComponent(blog.path)}`;
    };

    if (blog.image) {
      const img = document.createElement("img");
      img.src = `assets/images/${blog.image}`;
      img.alt = blog.title;
      img.onerror = function() { this.style.display = 'none'; };
      card.appendChild(img);
    }

    const info = document.createElement("div");
    info.className = "blog-info";
    info.innerHTML = `
      <small>🕒 ${formatDate(blog.dateText)}</small>
      <h2>${blog.title}</h2>
    `;
    
    card.appendChild(info);
    blogList.appendChild(card);
  });

  renderPagination();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPagination() {
  let pagination = document.getElementById("pagination");
  if (!pagination) {
    pagination = document.createElement("div");
    pagination.id = "pagination";
    pagination.className = "pagination";
    blogList.parentNode.insertBefore(pagination, blogList.nextSibling);
  }

  pagination.innerHTML = "";
  const totalPages = Math.ceil(allBlogData.length / BLOGS_PER_PAGE);
  if (totalPages <= 1) return;

  const prev = document.createElement("button");
  prev.textContent = "‹ Previous";
  prev.disabled = currentPage === 1;
  prev.onclick = () => renderPage(currentPage - 1);
  pagination.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");
      btn.onclick = () => renderPage(i);
      pagination.appendChild(btn);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      pagination.appendChild(dots);
    }
  }

  const next = document.createElement("button");
  next.textContent = "Next ›";
  next.disabled = currentPage === totalPages;
  next.onclick = () => renderPage(currentPage + 1);
  pagination.appendChild(next);
}

// ==============================
// BLOG DETAIL PAGE
// ==============================
const content = document.getElementById("content");

if (content) {
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");

  if (!file) {
    content.innerHTML = "<p style='text-align:center; padding:40px; color:#ef4444;'>No blog file specified.</p>";
  } else {
    // We use decodeURIComponent because we encoded it in the URL
    fetch(decodeURIComponent(file))
      .then(res => {
        if (!res.ok) throw new Error(`File not found: ${file}`);
        return res.text();
      })
      .then(md => {
        const fm = md.match(/^---([\s\S]*?)---/);
        const meta = fm ? fm[1] : "";

        const title = meta.match(/title:\s*(.+)/)?.[1]?.trim() ?? "Untitled";
        const dateRaw = meta.match(/publishDate:\s*(.+)/)?.[1]?.trim() ?? "";
        const image = meta.match(/image:\s*(.+)/)?.[1]?.trim();

        let cleaned = md.replace(/^---[\s\S]*?---/, "");
        let html = `<h1 class="blog-title">${title}</h1>`;
        html += `<p class="blog-date">🕒 ${formatDate(dateRaw)}</p>`;

        if (image) {
          html += `<img src="assets/images/${image}" class="blog-hero" alt="${title}" onerror="this.style.display='none'"/>`;
        }

        html += marked.parse(cleaned);
        content.innerHTML = html;
      })
      .catch(err => {
        content.innerHTML = `<p style='text-align:center; padding:40px; color:#ef4444;'>Error: ${err.message}</p>`;
      });
  }
}
const searchInput = document.getElementById("blogSearchInput");
const clearBtn = document.getElementById("clearSearch");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm !== "") {
      clearBtn.classList.add("visible");
      // Filter from the pre-loaded data
      const filteredBlogs = allBlogData.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm)
      );
      updateBlogDisplay(filteredBlogs, searchTerm);
    } else {
      // RESTORE ORIGINAL STATE
      clearBtn.classList.remove("visible");
      const pagination = document.getElementById("pagination");
      if (pagination) {
        pagination.classList.remove("hidden");
        pagination.style.display = "flex";
      }
      renderPage(1); // Goes back to the original 6-per-page view
    }
  });
}
// Logic for the Clear ("X") button
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.classList.remove("visible");
    
    // 1. Show the pagination element again
    const pagination = document.getElementById("pagination");
    if (pagination) {
      pagination.classList.remove("hidden");
      pagination.style.display = "flex"; // Ensure it's visible
    }

    // 2. Re-render the first page (this restores the 6-per-page limit)
    renderPage(1); 
    
    searchInput.focus();
  });
}
function updateBlogDisplay(filteredData, term) {
  const blogList = document.getElementById("blogList");
  const pagination = document.getElementById("pagination");
  if (!blogList) return;

  blogList.innerHTML = "";
  
  if (filteredData.length === 0) {
    blogList.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted);">No projects found for "${term}"</p>`;
    if (pagination) pagination.classList.add("hidden");
    return;
  }

  // Hide pagination only during active search
  if (pagination) {
    pagination.classList.add("hidden");
    pagination.style.display = "none";
  }

  // Re-render the cards for the search results
  filteredData.forEach(blog => {
    const card = document.createElement("div");
    card.className = "blog-card";
    card.onclick = () => window.location.href = `blog.html?file=${encodeURIComponent(blog.path)}`;

    if (blog.image) {
      const img = document.createElement("img");
      img.src = `assets/images/${blog.image}`;
      img.alt = blog.title;
      card.appendChild(img);
    }

    const info = document.createElement("div");
    info.className = "blog-info";
    info.innerHTML = `
      <small>🕒 ${formatDate(blog.dateText)}</small>
      <h2>${blog.title}</h2>
    `;
    
    card.appendChild(info);
    blogList.appendChild(card);
  });
}

