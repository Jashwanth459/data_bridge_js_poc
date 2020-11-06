function handlePagination(e) {
    console.log('yesy,', e.target.id)
    if (e.target.id == 'page_prev' || e.target.id == 'page_next') {
        return
    }
    let tracking_id = e.target.id.split('_');
    var list = document.getElementById("posts_list")
    list.remove();
    var spinner = document.getElementById('spinner')
    if (tracking_id[1] == 'prev') {
        spinner.style = 'op-spin 1.5s linear infinite'
    } else {
        spinner.style = 'spin 1.5s linear infinite'
    }
    spinner.style = 'display: inline-flex'
    setTimeout(() => {
        init(tracking_id)
    }, 2000)
}
