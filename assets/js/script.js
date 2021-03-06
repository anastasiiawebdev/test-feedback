'use strict';
function getBlock(el) {
 if ('classList' in el && !el.classList.contains('js_reply_list')) {
  return getBlock(el.parentNode);
 } else if (el.className !== undefined) {
  return el.className;
 } else {
  return null;
 }
}
function viewAllThreads(target) {
 let targetParent = target.parentNode,
   targetParentParent = targetParent.parentNode;
 if (target.classList.contains('js_reply_list')) {
  target.classList.add('thread_opened');
 } else if (target.classList.contains('js_icon_arrow') && targetParentParent.classList.contains('thread_opened')) {
  targetParentParent.classList.remove('thread_opened');
 }
}
function reply(target) {
 let targetParent = target.parentNode,
   replyTargets = document.querySelectorAll('.js_reply'),
   block = getBlock(target);
 replyTargets.forEach(function(element) {
  let replyTargetParent = element.parentNode,
    commentContent = replyTargetParent.parentNode;
  if (target.classList.contains('js_reply') && targetParent.parentNode.classList.contains('feedback__content_active')) {
   commentContent.classList.remove('feedback__content_active');
   targetParent.parentNode.classList.remove('feedback__content_active');
  } else if (target.classList.contains('js_reply') && !target.classList.contains(block)) {
   commentContent.classList.remove('feedback__content_active');
   targetParent.parentNode.classList.add('feedback__content_active');
  }
 });
}
document.addEventListener('click', function(event) {
 reply(event.target);
 viewAllThreads(event.target);
});
