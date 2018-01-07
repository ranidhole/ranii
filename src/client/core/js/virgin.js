/* Required for Show/Hide Password Button widget
---------------------------------------------- */
function maskUnmaskPws(obj) {
    if (obj.next('input').attr('type') == 'password') {        
		//obj.html("HIDE");
        //obj.next("input").attr('type', 'text');	
        obj.parents(".vm-panel-body").find(".maskUnMaskPwsBtn").html("HIDE");
		obj.parents(".vm-panel-body").find(".maskUnMaskPwsBtn").next("input").attr('type', 'text');		
        obj.next("input").focus();
    }
    else {
        //obj.html('SHOW');
        //obj.next("input").attr('type', 'password');
		obj.parents(".vm-panel-body").find(".maskUnMaskPwsBtn").html("SHOW");
		obj.parents(".vm-panel-body").find(".maskUnMaskPwsBtn").next("input").attr('type', 'password');
        obj.next("input").focus();
    }
} 

function changeModalSubTab(btnClicked, tabNo) {
    var container = $(btnClicked).parents('.modal-content');
    $(container).find('.btn-modalSubNav').removeClass('active');
    $(btnClicked).addClass('active');
    $(container).find('.modalTab').addClass('hidden');
    $(container).find(tabNo).removeClass('hidden');
    $("img.lazy").lazyload({effect: "fadeIn"});
}

function openRecoveryTab(radioClicked, tabToOpen){
    $(document).find('.recoveryTab').addClass('hidden');
    $(tabToOpen).removeClass('hidden');
}
function changeRadioBg(event) {
    var e = event || windows.event,
        itemClicked = $(e.target);
    itemClicked.parents('.panel.bgWhite').find('.bgRadioPanel').removeClass('active');
    itemClicked.parents('.panel.bgWhite').find('.bgRadioPanel').find('input[type = radio]').prop( "checked", false );
    itemClicked.parents('.bgRadioPanel').addClass('active');
    itemClicked.parents('.bgRadioPanel').find('input[type = radio]').prop("checked", true);
}
function openTabFromSelect(selectItem) {
    var mainTabToOpen = $(selectItem).val(),
        mainNavBtnToActivate = mainTabToOpen.substring(12, 13);
        tabParent = $(selectItem).parents('.modal-content');
    $(tabParent).find('.modalTab').addClass('hidden');
    $(mainTabToOpen).removeClass('hidden');
    $(tabParent).find('.btn-modalSubNav').removeClass('active');
    $(tabParent).find('.btn-modalSubNav').eq(mainNavBtnToActivate).addClass('active');
    $("img.lazy").lazyload({effect: "fadeIn"});
}
function openSendCodeMessage(itemClicked) {
    if ($(itemClicked).parents('.recoveryTab').length > 0) {
        $(itemClicked).parents('.recoveryTab').find('.sendCodeMessage').removeClass('hidden');
    } else {
        $(itemClicked).parents('.panel-body').find('.sendCodeMessage').removeClass('hidden');
    }
    
}
function openSecretAnswer(itemClicked){
    questionID = $(itemClicked).attr('id');
    questionChoice = $(itemClicked).val();
    if (questionID == 'secretQn1') {
        //alert('questionID == secretQn1');
        if (questionChoice == 'custom') {
            $(itemClicked).parent().find('#secretAnsForm2').removeClass('hidden');
            $(itemClicked).parent().find('#secretAnsForm1').addClass('hidden');
        } else {
            $(itemClicked).parent().find('#secretAnsForm1').removeClass('hidden');
            $(itemClicked).parent().find('#secretAnsForm2').addClass('hidden');
        }
    } else if (questionID == 'secretQn2') {
        if (questionChoice == 'custom') {
            $(itemClicked).parent().find('#secretAnsForm4').removeClass('hidden');
            $(itemClicked).parent().find('#secretAnsForm3').addClass('hidden');
        } else {
            $(itemClicked).parent().find('#secretAnsForm3').removeClass('hidden');
            $(itemClicked).parent().find('#secretAnsForm4').addClass('hidden');
        }
    } else if (questionID == 'secretQn3') {
        if (questionChoice == 'custom') {
            $(itemClicked).parent().find('#secretAnsForm6').removeClass('hidden');
            $(itemClicked).parent().find('#secretAnsForm5').addClass('hidden');
        } else {
            $(itemClicked).parent().find('#secretAnsForm5').removeClass('hidden');
            $(itemClicked).parent().find('#secretAnsForm6').addClass('hidden');
        }
    }
}
$('.bgRadioPanel').click(function (event) {
    e = event || window.event;
    $(e.currentTarget).find('input').trigger('click');
});
//Vertically center modal window and make content scrollable if modal is too long
if ($(window).width() > 991) { //for desktop only
    function setModalMaxHeight(element) {
        this.$element = $(element);
        this.$content = this.$element.find('.modal-content');
        var borderWidth = this.$content.outerHeight() - this.$content.innerHeight();
        var dialogMargin = $(window).width() < 768 ? 20 : 60;
        var contentHeight = $(window).height() - (dialogMargin + borderWidth);
        var headerHeight = this.$element.find('.modal-header').outerHeight() || 0;
        var subHeight = this.$element.find('.modal-sub-header').outerHeight() + 1 || 0;
        var footerHeight = this.$element.find('.modal-footer').outerHeight() || 0;
        var maxHeight = contentHeight - (headerHeight + subHeight + footerHeight);

        //this.$content.css({
        //    'overflow': 'hidden'
        //});

        this.$element
          .find('.modal-body').css({
              'max-height': maxHeight,
              'overflow-y': 'auto'
          });
    }

    $('.modal').on('show.bs.modal', function () {
        $(this).show();
        setModalMaxHeight(this);
    });

    $(window).resize(function () {
        if ($('.modal.in').length != 0) {
            setModalMaxHeight($('.modal.in'));
        }
    });

};

//added to give focus to the modal close button when the modal is launched from a link. Tabbing will then start from this button onward so the first tab will always bring you to the NEXT FOCUSABLE ELEMENT INSIDE THE MODAL
function setFocusTimeout(item) {
    var focusTimeout = window.setTimeout(focusOnCloseBtn, 500);
    function focusOnCloseBtn() {
        $($(item).attr('data-target')).find('.modal-header').find('button').focus();
        clearTimeout(focusTimeout);
    }
}

//LazyLoad
$(document).ready(function () {
        if (typeof $('img.lazy').lazyload !== 'undefined') {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        }
      $('.modal').on('shown.bs.modal', function () {
        setTimeout(function(){
        $("img.lazy").lazyload({effect: "fadeIn" });
    }, 100);
    });
});

//Tabs
$("ul.tabs li").click(function () {
    $(".tab-content").hide();
    var activeTab = $(this).attr("data-rel");
    $("#" + activeTab).fadeIn();
    $("ul.tabs li").removeClass("active_tabs");
    $(this).addClass("active_tabs");
    $(".tab_heading").removeClass("d_active");
    $(".tab_heading[data-rel^='" + activeTab + "']").addClass("d_active");
});
//Mobile hamburger selectbox tab container selection
$(".custom-selection").change(function () {
    var option_activeTab = $('option:selected', this).attr('data-rel');
    $(".tab-content").hide();
    $("#" + option_activeTab).show();
    $(".tab_heading").removeClass("option_active");
    $(this).addClass("option_active");
});

//Focuses modal close button when shown
$('.modal').on('shown.bs.modal', function () {
    $('.close').focus();
})