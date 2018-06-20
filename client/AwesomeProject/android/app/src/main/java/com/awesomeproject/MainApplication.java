package com.awesomeproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
// import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

import com.airbnb.android.react.maps.MapsPackage;

public class MainApplication extends Application implements ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FBSDKPackage(mCallbackManager),
            new VectorIconsPackage(),
            new RNCameraPackage(),
                 new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    // super.onCreate();
    // SoLoader.init(this, /* native exopackage */ false);
     // super.onCreate();
     //    // Initialize the SDK before executing any other operations,
     //    FacebookSdk.sdkInitialize(getApplicationContext());
     //    AppEventsLogger.activateApp(this);

          super.onCreate();
  FacebookSdk.setApplicationId("2080239352245956");
  FacebookSdk.sdkInitialize(this);
  AppEventsLogger.activateApp(this);
  SoLoader.init(this, /* native exopackage */ false);
  }
     
}
