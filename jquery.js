// And here we have some mysterious javascript snippet
//
// Let's try to answer some questions here:
// 1. Can you guess what it does in general?
// 2. How would you implement such thing? Would you use
// similar approach or something totally different or maybe in-between?
// 3. Can you point some obvious and less obvious issue with this code?
//
// Again please prepare secret gist with the answers!
//
$(document).ready(function() {
  var $dateInput = $("#job_job_completion_date");
  var datePickerIndex = 3

  if ($dateInput.length) {
      $dateInput.hide();

      var values = $dateInput.data("values").split(",");
      var $select = $("<select>").addClass("select-date");

      var $datePickerBtn = $("<button>", {
          html: '<i class="fa fa-calendar" aria-hidden="true"></i>'
        , class: "open-date-picker"
       });

      $datePickerBtn.hide().click(function () {
        $datePicker.show().focus().hide();
        return false;
      });

      var $datePicker = $("<input>", {
          type: "text",
          readonly: true
      });

      $datePicker.datepicker({
          minDate: 0
      }).hide().on("change", function () {
          $dateInput.val(this.value);
          $select.find("option").eq(datePickerIndex).text("Select: " + this.value);
      });

      $select.append(values.map(function (c, i) {
          return $("<option>", { text: c, value: c, "data-index": i });
      }));


      $select.on("change", function () {
          var $selected = $(this).find("option:selected");
          if (+$selected.data("index") === datePickerIndex) {
              $dateInput.val("");
              $datePickerBtn.show().click();
          } else {
              $datePickerBtn.hide();
              $datePicker.hide();
              $dateInput.val(this.value);
              $select.find("option").eq(datePickerIndex).text("Select: please choose data");
          }
      });

      var existingValue = $dateInput.val();
      var setAfter = false;
      if (existingValue) {
          if ($select.find("option[value='" + existingValue + "']").length) {
              $datePicker.show();
              $select.val(existingValue);
          } else {
              setAfter = true;
              $datePicker.hide();
              $select.val($select.find("option[data-index=" + datePickerIndex + "]").text());
          }
      }

      $select.change();
      $dateInput.before([$select, $datePickerBtn, "<br>", $datePicker]);

      if (setAfter) {
          $datePicker.val(existingValue).change();
      }
  }
});
