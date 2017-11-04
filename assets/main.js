
  $("#search-btn").on("click", function() {
    var searchedCharacter = $("#table-search").val().trim();

    searchedCharacter = searchedCharacter.replace(/\s+/g, "").toLowerCase();

    $.get("/api/" + searchedCharacter, function(data) {
      console.log(data);
      if (data) {
        $("#rsvp").show();
        $("#name").text(data.name);
        $("#phone").text(data.phoneNum);
        $("#email").text(data.email);
        $("#userId").text(data.uid);
      }
      else {
        $("#name").text("Unable to make RSVP.");
        $("#stats").hide();
      }
    });
  });
