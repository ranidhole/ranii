/* Password strength POPOVER initialization - ( proper validation rules need to be updated ).
************************************************************************************************************************ */
jQuery(document).ready(function () {

    "use strict";
    var options = {};
    options.ui = {
        showPopover: true,
        showErrors: false,
        placement: "right",
        container: "#pwStrengthTooltipWrapper",
        verdicts: [
            "<span class='weakColor'><span class='passwordVerdictLabel'>Password strength</span><span class='passwordVerdictTxt'>Weak</span><br><span class='pwstrengthProgress'><span class='pwstrengthProgressBar pwstrengthProgressBarWeak'></span></span></span>",
            "<span class='normal_medium_Color'><span class='passwordVerdictLabel'>Password strength</span><span class='passwordVerdictTxt'>Medium</span><br><span class='pwstrengthProgress'><span class='pwstrengthProgressBar pwstrengthProgressBarMedium'></span></span></span>",
            "<span class='normal_medium_Color'><span class='passwordVerdictLabel'>Password strength</span><span class='passwordVerdictTxt'>Medium</span><br><span class='pwstrengthProgress'><span class='pwstrengthProgressBar pwstrengthProgressBarMedium'></span></span></span>",
            "<span class='strongColor'><span class='passwordVerdictLabel'>Password strength</span><span class='passwordVerdictTxt'>Strong</span><br><span class='pwstrengthProgress'><span class='pwstrengthProgressBar pwstrengthProgressBarStrong'></span></span></span>",
            "<span class='strongColor'><span class='passwordVerdictLabel'>Password strength</span><span class='passwordVerdictTxt'>Strong</span><br><span class='pwstrengthProgress'><span class='pwstrengthProgressBar pwstrengthProgressBarStrong'></span></span></span>",
        ],
        showProgressBar: false,
        showVerdictsInsideProgressBar: false

    };
    options.common = {
        debug: true,
        onKeyUp: function () {
            //alert("keyup");
            if (jQuery(".popover").length) {
                var newTitle = "<div>Must contain at least 8 characters, including one number.</div>";
                jQuery('.popover-title').html(newTitle).show();
                jQuery("html").addClass("popoverTrue");

                if (window.innerWidth > 1024) {
                    //console.log("rightResize");
                    jQuery(".popover").removeClass("bottom");
                    jQuery(".popover").addClass("right");

                }
            };

        }
    };

    options.rules = {
        activated: {
            wordTwoCharacterClasses: true,
            wordLength: 8,
            wordOneNumber: true,
            wordRepetitions: true
        }
    };

    if (jQuery("#txtPassword").length) {

        //debugger;
        jQuery('#txtPassword').pwstrength(options);

        //jQuery('#txtPassword').pwstrength("addRule", "minChar8_OneNumber_oneAlpha", function (options, word, score) {
        //		return word.match(/\d+/) || word.match(/[a-zA-Z]/) && score;				
        //}, -100, true);

    };

    /* Closing POPOVER onClick of Body except POPOVER Box
    -------------------------------------------------- */
    jQuery('html').on('click', function (e) {
        if (jQuery("html").find("#pwStrengthTooltipWrapper").length) {
            if (typeof jQuery(e.target).data('original-title') == 'undefined' &&
               !jQuery(e.target).parents().is('.popover.in')) {
                jQuery('[data-original-title]').popover('hide');
                jQuery("html").removeClass("popoverTrue");
            }
        }
    });

    /* End of Password strength POPOVER - initialization
    ************************************************************ */


    /* Detect viewport size on page load
    ************************************************************ */
    if (window.innerWidth <= 1024) {
        //console.log("bottom");		
        jQuery(".popover").removeClass("right");
        jQuery(".popover").addClass("bottom");

    }
    if (window.innerWidth > 1024) {
        //console.log("right");			
        jQuery(".popover").removeClass("bottom");
        jQuery(".popover").addClass("right");
    }

});

/* Responsive behavior on resize
******************************** */
jQuery(window).resize(function () {

    if (window.innerWidth <= 1024) {
        //console.log("bottom");		
        //console.log("bottomResize");
        jQuery(".popover").removeClass("right");
        jQuery(".popover").addClass("bottom");
    }

    if (window.innerWidth > 1024) {
        //console.log("right"); 
        //console.log("rightResize");
        jQuery(".popover").removeClass("bottom");
        jQuery(".popover").addClass("right");
    }

});
