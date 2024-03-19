$(() => {

    const modal = new bootstrap.Modal($(".modal")[0]);

    loadPeople();

    $('.show-modal').on('click', function () {
        $("#first_name").val('');
        $("#last_name").val('');
        $("#age").val('');
        $('#save-person').removeData();
        modal.show();
    });

    $('#save-person').on('click', function () {
        const firstName = $("#first_name").val();
        const lastName = $("#last_name").val();
        const age = $("#age").val();

        const id = $(this).data('id');
        if (id) {
            $.post('/home/editperson', { id, firstName, lastName, age }, function () {
                modal.hide();
                loadPeople();
            })
        }
        else {
            $.post('/home/addperson', { firstName, lastName, age }, function () {
                modal.hide();
                loadPeople();
            });
        }
    });

    $('#edit').on('click', () => {
        if (!ensureValidity()) {
            return;
        }

        $.get('/home/getperson', { id: $(':checked').data('id') }, function (person) {
            if (person === null) {
                return;
            }

            $('#first_name').val(person.firstName);
            $('#last_name').val(person.lastName);
            $('#age').val(person.age);
            $('#save-person').data('id', person.id);
            modal.show();
        })
    })

    $('#delete').on('click', () => {
        if (!ensureValidity()) {
            return;
        }

        $.post("/home/deleteperson", { id: $(':checked').data('id') }, function () {
            loadPeople();
        })
    })

    $('tbody').on('click', '.checkbox', function () {
        ensureValidity();
    })

    function ensureValidity() {
        var valid = true;
        let count = 0;
        $(':checked').each(function () {
            count++;
        });

        if (!count || count > 1) {
            valid = false;
        }
      
        $('#delete').prop('disabled', !valid);
        $('#edit').prop('disabled', !valid);
        return valid;
    }

    function loadPeople() {
        $.get('/home/getpeople', function (people) {
            $("tbody tr").remove();
            people.forEach(({ id, firstName, lastName, age }) => {
                $("tbody").append(`
                <tr>
                    <td>
                        <input data-id="${id}" type="checkbox" class="checkbox"/>
                    </td>
                    <td>${firstName}</td>
                    <td>${lastName}</td>
                    <td>${age}</td>
                </tr>`);
            });
        });
    }
})
