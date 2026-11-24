package com.shopmate

import android.os.Bundle
import android.graphics.Color
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    WindowCompat.setDecorFitsSystemWindows(window, false)

   window.navigationBarColor = Color.BLACK

val controller = WindowInsetsControllerCompat(
    window,
    window.decorView
)

controller.isAppearanceLightNavigationBars = false

    // Sirf status bar hide
    controller.hide(
      WindowInsetsCompat.Type.statusBars()
    )
  }

  override fun getMainComponentName(): String = "shopMate"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
    DefaultReactActivityDelegate(
      this,
      mainComponentName,
      fabricEnabled
    )
}