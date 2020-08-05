(function () {
  function q(a) {
    return a && a.__esModule ? { d: a.default } : { d: a };
  }
  var p = {};
  var e = {},
    m = (e = { version: "2.6.11" });
  "number" == typeof __e && (__e = m);
  var n = {},
    i = e.JSON || (e.JSON = { stringify: JSON.stringify });
  n = function ($) {
    return i.stringify.apply(i, arguments);
  };
  p = n;
  try {
    var j = function (e) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,63})+$/.test(e);
      },
      c = function (e) {
        var t = e.target,
          r = t.name,
          a = t.type,
          o = t.value,
          n = document.querySelector("#" + r + "_wrap");
        if ("" !== o.trim()) {
          if (
            (n && (n.className = "db cf relative active"),
            0 === store.submitCount)
          )
            return;
          var i = t.checkValidity();
          "email" !== a || j(o) || (i = !1), f(t, i);
        } else n && (n.className = "db cf relative");
      };
    (window.inputs = document.querySelectorAll(
      'input[type="text"], input[type="email"], input[type="tel"], input[type="number"]'
    )),
      (window.fieldsets = document.querySelectorAll("fieldset")),
      (window.dropdowns = document.querySelectorAll("select")),
      (window.form = document.querySelector("form#\u2261")),
      (window.button = document.querySelector("#submit"));
    var h = button ? button.innerHTML : "Let's Go!";
    window.store = {
      lead_id: !1,
      submitCount: 0,
      preventPost: !1,
      data: {},
      lock: function () {
        var e;
        for (button.disabled = !0, e = 0; e < inputs.length; e++)
          inputs[e].disabled = !0;
      },
      unlock: function () {
        var e;
        for (button.disabled = !1, e = 0; e < inputs.length; e++)
          inputs[e].disabled = !1;
      },
    };
    var g =
        "b mv2 br2 bg-red white pa2 f6 ba b--white-10 tc overflow-hidden absolute w-100",
      k =
        "b mv2 br2 bg-green white pa2 f6 ba b--white-10 tc overflow-hidden absolute w-100",
      d = document.createElement("div");
    (d.className = "relative"),
      (d.innerHTML = '<div id="status"></div>'),
      form && form.appendChild(d);
    for (
      var b = document.getElementById("status"),
        f = function (e, t) {
          if ("FIELDSET" === e.tagName)
            return (
              (e.className = e.className.replace(/ error/g, "")),
              void (t || (e.className = e.className + " error"))
            );
          t
            ? (e.className = e.className.replace(/ err/g, ""))
            : -1 === e.className.indexOf(" err") &&
              (e.className = e.className + " err");
        },
        a = 0;
      a < inputs.length;
      a++
    )
      inputs[a].addEventListener("keyup", c),
        inputs[a].addEventListener("change", c),
        inputs[a].addEventListener("blur", c);
    [].forEach.call(dropdowns, function (e, t) {
      e.addEventListener("change", function (t) {
        (document.getElementById(e.id + "_wrap").className =
          "db cf relative active"),
          e.addEventListener("change", null);
      });
    }),
      (window.formSubmit = function (e) {
        try {
          store.submitCount++;
          var t = !0;
          if (
            ([].forEach.call(inputs, function (e, r) {
              e.required
                ? "" !== e.value.trim() &&
                  e.checkValidity() &&
                  ("email" !== e.type || j(e.value))
                  ? f(e, !0)
                  : ((t = !1), f(e, !1))
                : f(e, !0);
            }),
            [].forEach.call(fieldsets, function (e, r) {
              var a = document.getElementsByName(e.id);
              if (a[0].required) {
                var o = !1;
                for (r = 0; r < a.length; )
                  a[r].checked && (o = !0),
                    (a[r].onclick = function () {
                      f(e, !0);
                    }),
                    r++;
                f(e, o), o || (t = !1);
              } else f(e, !0);
            }),
            [].forEach.call(dropdowns, function (e, r) {
              e.required
                ? (f(e, e.value),
                  (e.onchange = function () {
                    f(e, !0);
                  }),
                  e.value || (t = !1))
                : f(e, !0);
            }),
            !t)
          )
            return (
              (b.className = g),
              (b.innerHTML =
                window.formErrorMessage || "Please fill out the form"),
              (b.style.transform = "scale(.95)"),
              setTimeout(function () {
                b.style.transform = "";
              }, 80),
              store.unlock(),
              !1
            );
          store.lock(),
            (h = button.innerHTML),
            (button.innerHTML +=
              '<div class="loader" style="border-left: .3em solid ' +
              button.style.color +
              "; border-top:.3em solid " +
              button.style.color +
              "; border-bottom:.3em solid transparent; border-right:.3em solid " +
              button.style.color +
              ';"></div>'),
            (window.formData = {});
          for (var r = 0; r < inputs.length; r++)
            formData[inputs[r].name] = inputs[r].value;
          for (r = 0; r < fieldsets.length; r++) {
            var a = fieldsets[r],
              o = document.querySelector("input[name='".concat(a.id, "']"));
            if ("radio" === o.type) {
              var n = document.querySelector(
                "input[name='".concat(a.id, "']:checked")
              );
              n && (formData[a.id] = n.value);
            }
            if ("checkbox" === o.type) {
              var i = document.querySelectorAll(
                "input[name='".concat(a.id, "']:checked")
              );
              formData[a.id] = "";
              for (var s = 0; s < i.length; s++)
                (formData[a.id] += i[s].value),
                  i.length != s + 1 && (formData[a.id] += "|");
            }
          }
          for (r = 0; r < dropdowns.length; r++)
            formData[dropdowns[r].id] =
              dropdowns[r].options[dropdowns[r].selectedIndex].value;
          try {
            for (var l in (window.beforePost && window.beforePost(),
            store.data))
              (store.data.hasOwnProperty(l) || formData[l]) &&
                (formData[l] = store.data[l]);
          } catch (e) {
            console.error(e);
          }
          if (!0 === store.preventPost) return e.preventDefault(), !1;
          var $Ozuw$$interop$default = q(p);
          if (
            (store.lead_id &&
              $Ozuw$$interop$default.d(formData) !==
                $Ozuw$$interop$default.d({}) &&
              (formData.lead_id = store.lead_id),
            redirect && setRedirectParameters)
          )
            for (var l in ((redirect += "?"), formData))
              if (formData.hasOwnProperty(l)) {
                var c = formData[l];
                redirect += l + "=" + encodeURIComponent(c) + "&";
              }
          (b.className = ""), (b.innerHTML = "");
          var d = new XMLHttpRequest();
          d.open("post", window.location.pathname),
            d.setRequestHeader(
              "Content-Type",
              "application/json; charset=UTF-8"
            ),
            d.send($Ozuw$$interop$default.d(formData)),
            (d.onreadystatechange = function () {
              if (4 === d.readyState)
                if (((button.innerHTML = h), 200 === d.status)) {
                  if ("localStorage" in window)
                    try {
                      var t = JSON.parse(d.response);
                      t.lead_id && localStorage.setItem("lead_id", t.lead_id);
                    } catch (e) {
                      console.error(e);
                    }
                  try {
                    window.success && window.success();
                  } catch (e) {
                    console.error(e);
                  }
                  redirect
                    ? ((window.location.href = redirect), store.unlock())
                    : ((b.className = k),
                      (b.innerHTML =
                        inputs && inputs.length > 0
                          ? "Form Submitted"
                          : "Success"),
                      store.unlock());
                } else
                  (b.className = g),
                    (b.innerHTML = "Something went wrong"),
                    store.unlock();
            });
        } catch (e) {
          console.error(e),
            (button.innerHTML = h),
            (b.className = g),
            (b.innerHTML = "Something went wrong"),
            store.unlock();
        }
        return e.preventDefault(), !1;
      }),
      form &&
        (form.setAttribute("novalidate", !0), (form.onsubmit = formSubmit));
    var o = function (e) {
      var t = [];
      if (-1 === e.indexOf("?")) return t;
      var r = document.createElement("a");
      r.href = e;
      for (var a = r.search.substring(1).split("&"), o = 0; o < a.length; o++) {
        var n = a[o].split("=");
        "" !== n[0] &&
          n[1] &&
          t.push({ key: n[0], val: decodeURIComponent(n[1]) });
      }
      return t;
    };
    (window.params = o(window.location.href)),
      window.params.forEach(function (e) {
        var t = document.getElementById(e.key);
        if (
          (!t ||
            ("INPUT" !== t.tagName && "SELECT" !== t.tagName) ||
            (t.value = e.val),
          t && "FIELDSET" === t.tagName)
        ) {
          var r = document.querySelector("#".concat(e.key, " input"));
          if (
            "radio" === r.type ||
            ("checkbox" === r.type && -1 === e.val.indexOf("|"))
          ) {
            var a = document.querySelector(
              "#".concat(e.key, ' input[value="').concat(e.val, '"]')
            );
            a && (a.checked = !0);
          }
          if ("checkbox" === r.type && -1 !== e.val.indexOf("|"))
            e.val.split("|").forEach(function (t) {
              var r = document.querySelector(
                "#".concat(e.key, ' input[value="').concat(t, '"]')
              );
              r && (r.checked = !0);
            });
        }
      }),
      (window.onload = function () {
        try {
          for (var e = 0; e < inputs.length; e++) c({ target: inputs[e] });
          if ("localStorage" in window) {
            var t = localStorage.getItem("lead_id");
            t && (store.lead_id = t);
          }
          if (window.self !== window.top) {
            (window.onresize = function () {
              return parent.postMessage(
                void 0 !== document.height
                  ? document.height
                  : document.body.offsetHeight,
                "*"
              );
            }),
              onresize();
          }
          if (redirect) {
            var r = document.createElement("link");
            (r.rel = "prefetch"),
              (r.as = "html"),
              (r.href = redirect),
              document.head.appendChild(r);
          }
        } catch (a) {
          console.error(a);
        }
      });
  } catch (e) {
    console.error(e);
  }
})();
