(function( $ ) {
  var tests = {}
  var Mixup = {
    lookupTest: function (key, values) {
      var currentTest = Cookies.get("mixup-" + key);
      if (currentTest) {
        var test = values[currentTest];
        if (typeof(test) == "undefined") {
          Cookies.remove("mixup-" + key);
          var test = lookupTest(key, values);
        }
        return test;
      }
      else {
        currentTest = Math.floor(Math.random() * values.length);
        Cookies.set("mixup-" + key, currentTest);
        var test = values[currentTest];
        return test;
      }
    },
    runTest: function (group, test) {
      $("[data-ab-group='" + group + "']").hide()
      $("[data-ab-group='" + group + "'][data-ab-id='" + test + "']").show()
      $("[data-ab-group='" + group + "'][data-ab-id='" + test + "'] a").click(function (e) {
        var copy = $(e.target).text();
        mixpanel.track(group + " A/B Test", {
          Test: test,
          Target: copy
        });
      })
    }
  }

  $.fn.mixup = function() {
    if (typeof(mixpanel) == "undefined") {
      console.error("Mixpanel's JS SDK not found. Make sure it is included and configured.")
      return;
    }
    $('.ab-test.alt').hide(); // Hide all alternative content
    $(this).each(function() {
      $this = $(this)
      var group = $this.data('ab-group');

      if (!tests[group]) {
        tests[group] = {};
      }

      if (!tests[group]["items"]) {
        tests[group]["items"] = [];
      }

      var abid = $this.data('ab-id')
      if (tests[group]["items"].indexOf(abid) < 0) {
        tests[group]["items"].push(abid);
      }
    })
    $.each(tests, function (key, value) {
      var test = Mixup.lookupTest(key, value.items)
      Mixup.runTest(key, test)
    })
  }
}( jQuery ));
