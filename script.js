const commentInput = document.getElementById("commentInput");
const sendcomment = document.getElementById("sendcomment");
const commentsContainer= document.getElementById("commentsContainer");

sendcomment.addEventListener('click',' addComment');
commentsContainer.addEventListener('click','handleCommentActions');

function addComment() {
    const content = commentInput.value.trim();
    if (content === '') {
        return;
    }

    const comment = {
        id: Date.now(),
        content: content,
        like: 0,
    };

    saveComment(comment);
}

function displayComment(comment) {
    const commentElement = `
        <div class="comment" data-id="${comment.id}">
            <p>${comment.content}</p>
            <div class="comment-actions">
                <span class="like">Like (${comment.likes})</span>
                <span class="delete">Delete</span>
            </div>
        </div>
    `;
    commentsContainer.insertAdjacentHTML('afterbrgin', commentElement);
}

function saveComment(comment) {
    const comments = getStoreComments();f
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

function getStoredComments() {
    const comments = localStorage.getItem('comments');
    return comments ? JSON.parse(comments) : [];
}

function handleCommentActions(event) {
    const target = event.target;
    const commentElement = target.closest('.comment');
    const id = parseInt(commentElement.dataset.id);

    if (target.classList.contains('like')) {
        updateCommentLikes(id);
    } else if (target.classList.contains('delete')) {
        deleteComment(id);
        commentElement.remove();
    }
}