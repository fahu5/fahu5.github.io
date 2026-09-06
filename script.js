/**
 * Academic Portfolio Client Scripts
 * Mst. Fahmida Akter - Ph.D. Application & Research Portfolio
 */

// BibTeX Database for publications
const BIBTEX_DATA = {
  "munam2026depressive": `@article{munam2026parent,
  author    = {Munam, A. M. and Akter, Mst. Fahmida},
  title     = {Parent-daughter relationship quality and depressive symptoms among unmarried adolescent girls in Bangladesh: Evidence from 2019-20 Bangladesh Adolescent Health and Wellbeing Survey},
  journal   = {Psychiatry Research Communications},
  volume    = {6},
  number    = {1},
  pages     = {100244},
  year      = {2026},
  publisher = {Elsevier},
  doi       = {10.1016/j.psycom.2026.100244},
  url       = {https://doi.org/10.1016/j.psycom.2026.100244}
}`,

  "baghchesaraei2026waste": `@incollection{baghchesaraei2026ai,
  author    = {Baghchesaraei, O. R. and Choudhary, R. and Paneerselvam, B. and Duraisamy, Y. and Gupta, R. and Bhagat, C. and Ramu, P. and Akter, Mst. Fahmida and Enefu, O. M.},
  title     = {Chapter 9: AI for Waste Management, Circular Economy, and Sustainability Optimisation},
  booktitle = {Artificial Intelligence in Environmental Science: Opportunities, Challenges, and Ethical Frameworks},
  year      = {2026},
  publisher = {Bentham Science Publishers},
  note      = {Submitted / In Press}
}`,

  "akter2026hemocount": `@article{akter2026hemocount,
  title     = {HemoCount: A Web-Deployable System for Automated Hemocytometer Cell Counting Using a Lightweight YOLO Model},
  journal   = {Journal Manuscript Under Editing / Work in Progress},
  year      = {2026},
  note      = {Supervised by Prof. Shamim Ahmad, Head of CSE, Varendra University; Data source: Molecular Biology and Protein Science Laboratory, Department of Genetic Engineering and Biotechnology, University of Rajshahi}
}`
};

document.addEventListener("DOMContentLoaded", () => {
  initNavScroll();
  initPublicationFilters();
  initBibtexModal();
});

/* ==========================================================================
   NAVIGATION & SCROLL-SPY
   ========================================================================== */
function initNavScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".header-nav-links .nav-link, .sidebar-nav-link");

  if (!navLinks.length) return;

  function onScroll() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initMobileMenu() {
  // Mobile layout is in-flow; no modal menu required
}

/* ==========================================================================
   PUBLICATION CATEGORY FILTERS
   ========================================================================== */
function initPublicationFilters() {
  const filterBtns = document.querySelectorAll(".pub-filter-btn");
  const pubCards = document.querySelectorAll(".pub-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      pubCards.forEach(card => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "list-item";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   BIBTEX CITATION MODAL & COPY TO CLIPBOARD
   ========================================================================== */
function initBibtexModal() {
  const modal = document.getElementById("bibtexModal");
  const closeBtn = document.getElementById("modalClose");
  const copyBtn = document.getElementById("copyBibtexBtn");
  const codeBlock = document.getElementById("bibtexContent");
  const toast = document.getElementById("toast");

  if (!modal || !closeBtn || !copyBtn || !codeBlock) return;

  // Open modal buttons
  document.querySelectorAll(".btn-open-bibtex").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const citeKey = btn.getAttribute("data-cite");
      if (BIBTEX_DATA[citeKey]) {
        codeBlock.textContent = BIBTEX_DATA[citeKey];
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close modal
  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  // Copy BibTeX
  copyBtn.addEventListener("click", async () => {
    const textToCopy = codeBlock.textContent;
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast("Citation BibTeX copied to clipboard!");
      copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg> Copied!
      `;
      setTimeout(() => {
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg> Copy BibTeX
        `;
      }, 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  });

  function showToast(msg) {
    if (!toast) return;
    toast.querySelector(".toast-message").textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }
}
