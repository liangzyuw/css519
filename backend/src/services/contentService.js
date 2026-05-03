function getSectionsByChapterId(sections, chapterId) {
  return sections.filter((section) => section.chapter_id === chapterId);
}

function getSectionById(sections, sectionId) {
  return sections.find((section) => section.id === sectionId) || null;
}

function getTextbookSections(sections, textbookId) {
  return sections.filter((section) => section.textbook_id === textbookId);
}

module.exports = {
  getSectionsByChapterId,
  getSectionById,
  getTextbookSections,
};