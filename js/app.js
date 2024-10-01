$(document).ready(function() {
  // import json file
  $.getJSON("/portfolio-page/js/projects.json", function(data) {
    let projects = data.projects; // Ensure projects is only available here
    let certificates = data.certificates;
    let youtube = data.youtube;
    youtube = [];

    // Now that projects is loaded, append them to the portfolio-block
    projects.forEach(project => {
      $(".portfolio-block[data-type=projects]").append(`
                <div class="card">
                    <div class="card-body">
                        <img src="${project.cover}" alt="">
                        <h5 class="card-title">${project.title}</h5>
                    </div>
                </div>
            `);
    });

    let y = 0;
    // Now that projects is loaded, append them to the portfolio-block
    certificates.forEach(project => {
      y++;
      if (y > 8) {
        return;
      }
      $(".portfolio-block[data-type=certificates]").append(`
                <div class="card" data-index="${y}">
                    <div class="card-body">
                        <div class="certificate-div"><img src="${project.cover}" alt=""></div>
                        <h5 class="card-title">${project.title}</h5>
                    </div>
                </div>
            `);
    });
  });

  $(".portfolio-nav-item").on("click", function() {
    $(".portfolio-nav-item").removeClass("active");
    $(this).addClass("active");
    var selector = $(this).attr("data-type");
    $(".portfolio-block").removeClass("active");
    $(".portfolio-block[data-type=" + selector + "]").addClass("active");

    if (selector == "youtube") {
      // import json file
      $.getJSON("/portfolio-page/js/projects.json", function(data) {
        let youtube = data.youtube;
        let x = 0;
        // Now that projects is loaded, append them to the portfolio-block
        youtube.forEach(project => {
          x++;
          let url = project.url;
          // embed url
          url = url.replace(
            "https://www.youtube.com/watch?v=",
            "https://www.youtube.com/embed/"
          );
          url = url.replace(
            "https://youtu.be/",
            "https://www.youtube.com/embed/"
          );
          if (
            $(".portfolio-block[data-type=youtube]").find(
              ".card[data-index=" + x + "]"
            ).length > 0
          ) {
            return;
          }
          $(".portfolio-block[data-type=youtube]").append(`
                    <div class="card" data-index="${x}">
                        <div class="card-body">
                            <iframe src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                `);
        });
      });
    }

    if (selector == "certificates") {
      // import json file
      $.getJSON("/portfolio-page/js/projects.json", function(data) {
        let certificates = data.certificates;
        let x = 0;
        // Now that projects is loaded, append them to the portfolio-block
        certificates.forEach(project => {
          x++;
          if (
            $(".portfolio-block[data-type=certificates]").find(
              ".card[data-index=" + x + "]"
            ).length > 0
          ) {
            return;
          }
          $(".portfolio-block[data-type=certificates]").append(`
            <div class="card" data-index="${x}">
                <div class="card-body">
                    <div class="certificate-div"><img src="${project.cover}" alt=""></div>
                    <h5 class="card-title">${project.title}</h5>
                </div>
            </div>
        `);
        });
      });
    }
  });

  $("#contact-form").submit(function(e) {
    e.preventDefault();

    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    var mobile = $("#mobile").val().trim();
    var message = $("#message").val().trim();

    // Simple validation
    if (!name || !email || !mobile || !message) {
      $(".form-message")
        .text("All fields are required.")
        .addClass("error")
        .removeClass("success");
      return;
    }

    // Email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      $(".form-message")
        .text("Please enter a valid email address.")
        .addClass("error")
        .removeClass("success");
      return;
    }

    // Mobile validation (India-specific example)
    var mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      $(".form-message")
        .text("Please enter a valid 10-digit mobile number.")
        .addClass("error")
        .removeClass("success");
      return;
    }
    $("#submit").prop("disabled", true);

    // Send data using Ajax
    $.ajax({
      type: "POST",
      url: "http://imronit.in/portfolio-page/php/contact.php",
      data: {
        name: name,
        email: email,
        mobile: mobile,
        message: message
      },
      dataType: "json",
      encode: true
    })
      .done(function(response) {
        let data = response;
        if (data.status == "error") {
          $(".form-message")
            .text(data.message)
            .addClass("error")
            .removeClass("success");
        } else {
          $(".form-message")
            .text("Thank you for your message, I will get back to you soon.")
            .addClass("success")
            .removeClass("error");
        }
        $("#submit").prop("disabled", false);
      })
      .fail(function() {
        $(".form-message")
          .text("Oops! Something went wrong. Please try again.")
          .addClass("error")
          .removeClass("success");
      });
    $("#submit").prop("disabled", false);
  });

  // Toggle navigation menu on click of nav-toggle
  $(".nav-toggle").on("click", function(e) {
    e.stopPropagation(); // Prevents the click event from bubbling up to the document
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).html("<i class='fas fa-bars'></i>");
      $(".header-ul").removeClass("active");
    } else {
      $(this).addClass("active");
      $(this).html("<i class='fa-solid fa-xmark'></i>");
      $(".header-ul").addClass("active");
    }
  });

  // Close the menu when a nav link is clicked
  $(".header-ul li a").on("click", function() {
    if ($(".header-ul").hasClass("active")) {
      $(".nav-toggle").removeClass("active");
      $(".nav-toggle").html("<i class='fas fa-bars'></i>");
      $(".header-ul").removeClass("active");
    }
  });

  // Close the menu if clicked outside the header and nav-toggle
  $(document).on("click", function(e) {
    // Check if the clicked element is outside the header and nav-toggle
    if (
      !$(e.target).closest("header").length &&
      !$(e.target).is(".nav-toggle, .nav-toggle *")
    ) {
      if ($(".header-ul").hasClass("active")) {
        $(".nav-toggle").removeClass("active");
        $(".nav-toggle").html("<i class='fas fa-bars'></i>");
        $(".header-ul").removeClass("active");
      }
    }
  });

  $("h1").on("click", function() {
    //    go to home section
    $("html, body").animate(
      {
        scrollTop: $("#home").offset().top
      },
      1
    );
  });

  AOS.init({
    duration: 1200
  });
});

// AOS Functions
function fadeRight(element) {
  $(element).attr("data-aos", "fade-right");
  $(element).attr("data-aos-duration", "1200");
}

function fadeLeft(element) {
  $(element).attr("data-aos", "fade-left");
  $(element).attr("data-aos-duration", "1200");
}

function fadeUpLeft(element) {
  $(element).attr("data-aos", "fade-up-left");
  $(element).attr("data-aos-duration", "1200");
}

function fadeUpRight(element) {
  $(element).attr("data-aos", "fade-up-right");
  $(element).attr("data-aos-duration", "1200");
}

function zoomIn(element) {
  $(element).attr("data-aos", "zoom-in");
  $(element).attr("data-aos-duration", "1200");
}

function zoomOut(element) {
  $(element).attr("data-aos", "zoom-out");
  $(element).attr("data-aos-duration", "1200");
}

function zoomInUp(element) {
  $(element).attr("data-aos", "zoom-in-up");
  $(element).attr("data-aos-duration", "1200");
}

function zoomInDown(element) {
  $(element).attr("data-aos", "zoom-in-down");
  $(element).attr("data-aos-duration", "1200");
}

function zoomInLeft(element) {
  $(element).attr("data-aos", "zoom-in-left");
  $(element).attr("data-aos-duration", "1200");
}

function zoomInRight(element) {
  $(element).attr("data-aos", "zoom-in-right");
  $(element).attr("data-aos-duration", "1200");
}

function fadeUp(element) {
  $(element).attr("data-aos", "fade-up");
  $(element).attr("data-aos-duration", "1200");
}

document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".header-nav a");

  // Function to remove active class from all nav links
  function removeActiveClasses() {
    navLinks.forEach(link => {
      link.classList.remove("active");
    });
  }

  // Function to add active class to the current section's nav link
  function addActiveClass(currentSectionId) {
    navLinks.forEach(link => {
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  // Scroll event listener
  window.addEventListener("scroll", function() {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // Check if section is in view
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute("id");
      }
    });

    // Remove active class from all nav links, then add to the current section
    if (currentSection) {
      removeActiveClasses();
      addActiveClass(currentSection);
    }
  });
});
