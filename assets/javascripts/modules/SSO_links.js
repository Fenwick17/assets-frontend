require('jquery');

module.exports = function(element, ssoUrl, ssoMethod) {
  var $target,
      payload,
      clientSso,
      serverSso,
      destination,
      keepDefaultLinkBehaviour,
      newWindow,
      winId;

  var useGet = ssoMethod === 'GET';
  
  /**
   * Attach a one-time event handler for all global links
   */
  if (element) {
    $target = $(element.target);
    newWindow = !!$target.attr('target');
    winId = $target.attr('id');


    clientSso =
      $(element.target).data('sso') === true ||
      $(element.target).data('sso') === 'client';

    serverSso = $(element.target).data('sso') === 'server';

    if (clientSso || serverSso) {
      keepDefaultLinkBehaviour = false;
      destination = serverSso ? {
        ssoRedirect: true
      } : {
        destinationUrl: $target[0].href
      };

      $.ajax({
        url: serverSso ? $target[0].href : '/ssoout',
        data: destination, 
        type: 'GET',
        async: false,
        cache: false,
        success: function(data, status, jqXHR) {
          var win = window,
              getUrl = ssoUrl + '?payload=' + encodeURIComponent(data);
          
          if (useGet) {
            if (newWindow) {
              win.open(getUrl, !!winId ? winId : '_blank');
              win.focus();
            } else {
              win.location = getUrl;
            }
          } else {
            var form = document.createElement('form');
            form.method = 'POST';
            form.action = ssoUrl;

            if (newWindow) {
              form.target = !!winId ? winId : '_blank';
            }

            payload = document.createElement('input');
            payload.type = 'hidden';
            payload.name = 'payload';
            payload.value = data;
            document.body.appendChild(form);
            form.appendChild(payload);

            // POST form
            form.submit();

            if (newWindow) {
              win.focus();
            }
          }
        },

        error: function(jqXHR, textStatus, errorThrown) {
          if (jqXHR.status === 401) {
            keepDefaultLinkBehaviour = false;
            window.location.reload();
          } else {
            keepDefaultLinkBehaviour = true;
          }
        }
      });

      // cancel link click event if SSO call is successful and let the SSO redirect manage that
      return keepDefaultLinkBehaviour;
    }
  }
};
