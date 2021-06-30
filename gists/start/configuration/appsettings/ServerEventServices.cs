public class ServerEventsServices : Service
{
    public IAppSettings AppSettings { get; set; }

    public void Any(PostRawToChannel request)
    {
        if (!IsAuthenticated && AppSettings.Get("LimitRemoteControlToAuthenticatedUsers", false))
            throw new HttpError(HttpStatusCode.Forbidden, "You must be authenticated to use remote control.");
        //...
    }   
}
