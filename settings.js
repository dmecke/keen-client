$(document).ready(function() {

    $('#project-id').val(localStorage.getItem('project-id'));
    $('#write-key').val(localStorage.getItem('write-key'));

    $('#save-settings').click(function() {
        localStorage.setItem('project-id', $('#project-id').val());
        localStorage.setItem('write-key', $('#write-key').val());

        $('#save-settings-success-alert').addClass('in');
        window.setTimeout(function() {
            $('#save-settings-success-alert').addClass('out').removeClass('in');
        }, 2000);
    });
});
