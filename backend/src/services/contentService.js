function getTextbooks(textbooks) {
  return textbooks; 
}

function getTextbookById(textbooks, textbookId) {
  return textbooks.find((textbook) => textbook.id === textbookId) || null;
}

function getSectionsByChapterId(sections, chapterId) {
  return sections.filter((section) => section.chapter_id === chapterId);
}

function getSectionById(sections, sectionId) {
  return sections.find((section) => section.id === sectionId) || null;
}

function getTextbookSections(sections, textbookId) {
  return sections.filter((section) => section.textbook_id === textbookId);
}

function getChaptersByTextbookId(chapters, textbookId) {
  return chapters
    .filter((chapter) => chapter.textbook_id === textbookId)
    .sort((a, b) => a.order_index - b.order_index);
}

module.exports = {
  getTextbooks,
  getTextbookById,
  getSectionsByChapterId,
  getSectionById,
  getTextbookSections,
  getChaptersByTextbookId
};