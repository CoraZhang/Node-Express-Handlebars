// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".change-devour").on("click", function (event) {
    var id = $(this).data("id");
    // var newDevour = $(this).data("devour");
    // console.log(newDevour);
    // var newDevourState = {
    //   devoured: true
    // };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: { devoured: true }
    }).then(
      function () {
        console.log("changed devoured to", true);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".favorite").on("click", function (event) {
    var id = $(this).data("id");
    var fav = $(this).data("favorite");

    $.ajax("/api/burgers/fav/" + id, {
      type: "PUT",
      data: { favorite: fav }
    }).then(
      function () {
        location.reload();
      }
    );
  });

  $(".update-this").on("click", function (event) {
    $("#addForm").hide();
    $("#updateForm").show();

    var id = $(this).data("id");
    var name = $(this).data("name");
    var description = $(this).data("description");

    $("#id1").val(id);
    $("#name1").val(name);
    $("#description1").val(description);
  });

  $(".update-form").on("submit", function (event) {
    event.preventDefault();
    var id = $("#id1").val().trim();

    if (!$("#name1").val().trim() || !$("#description1").val().trim()) {
      $("#results-modal").modal();
    } else {
      var newBurger = {
        burger_name: $("#name1").val().trim(),
        description: $("#description1").val().trim()
      };

      $.ajax("/api/burgers/update/" + id, {
        type: "PUT",
        data: newBurger
      }).then(
        function () {
          console.log("changed favorite to", true);
          location.reload();
        }
      );
    }
  });

  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    if (!$("#name").val().trim() || !$("#description").val().trim()) {
      $("#results-modal").modal();
    } else {
      var newBurger = {
        burger_name: $("#name").val().trim(),
        description: $("#description").val().trim()
      };

      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function () {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    }
  });

  $(".delete").on("click", function (event) {
    let id = $(this).data("id");
    $.ajax({
      url: "/api/burgers/" + id,
      method: "DELETE"
    }).then(function (data) {
      if (data) {
        location.reload();
      }
    });
  });
});
