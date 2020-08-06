package com.rbisafeapp;

import com.facebook.react.ReactActivity;

// START 配置显示启动页 //
import org.devio.rn.splashscreen.SplashScreen;
// END 配置显示启动页 //

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    // START 配置显示启动页 //
    SplashScreen.show(this,R.style.AppTheme);
    // END 配置显示启动页 //
    return "rbisafeapp";
  }
}
